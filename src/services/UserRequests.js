import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { generateTag } from '@utils/generateTag';
import { setNewTag } from '@store/user/slices';
import { toast } from 'react-toastify';

export const UserRequests = {
  followUser: async function ({ currentUserId, targetUserId }) {
    try {
      await updateDoc(doc(db, 'users', targetUserId), {
        followers: arrayUnion(currentUserId),
      });
      await updateDoc(doc(db, 'users', currentUserId), {
        following: arrayUnion(targetUserId),
      });
      return targetUserId;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },

  unfollowUser: async function ({ currentUserId, targetUserId }) {
    try {
      await updateDoc(doc(db, 'users', targetUserId), {
        followers: arrayRemove(currentUserId),
      });
      await updateDoc(doc(db, 'users', currentUserId), {
        following: arrayRemove(targetUserId),
      });
      return targetUserId;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getUserById: async function (id) {
    try {
      const userRef = doc(db, 'users', id);
      const data = await getDoc(userRef);
      return data;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getFollowingByTag: async function (tag) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('tag', '==', tag));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0].data();
      let result = [];
      if (userData.following.length !== 0) {
        result = await this.getUsersByIds(userData.following);
      }
      return result;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getFollowersByTag: async function (tag) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('tag', '==', tag));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0].data();
      let result = [];

      if (userData.followers.length !== 0) {
        result = await this.getUsersByIds(userData.followers);
      }

      return result;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getUsersByIds: async function (ids) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', 'in', ids));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      return result;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getUserByTag: async function (tag) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('tag', '==', tag));
      const querySnapshot = await getDocs(q);

      let user = null;
      querySnapshot.forEach((doc) => {
        user = { id: doc.id, ...doc.data() };
      });

      return user;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getUsers: async function (userId, usersLimit) {
    try {
      const usersCollection = collection(db, 'users');
      const userQ = query(
        usersCollection,
        where('uid', '!=', userId),

        limit(usersLimit)
      );
      const usersSnap = await getDocs(userQ);
      const result = [];
      usersSnap.docs.forEach((doc) => result.push(doc.data()));
      return result;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  },
  getTags: async function () {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnap = await getDocs(usersCollection);
      const tags = [];
      usersSnap.forEach((user) => {
        const data = user.data();
        tags.push(data.tag);
      });
      return tags;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  },
  changeTag: async function (userId, newTag, dispatch) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { tag: newTag });

      dispatch(setNewTag(newTag));
      toast.success('Tag successfully changed ');
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  pushUserToDb: async function (userId, userData) {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        following: [],
        followers: [],
        bookmarks: [],
      });
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },

  updateUserInfo: async function (data) {
    try {
      const userRef = doc(db, 'users', data.uid);
      await updateDoc(userRef, data);
      toast.success('Info successfully changed');
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },

  googleAuth: async function () {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      const { email, uid, displayName, photoURL } = data.user;
      const userSnap = await this.getUserById(uid);

      if (!userSnap.exists() && email) {
        const tag = generateTag();
        await this.pushUserToDb(uid, {
          name: displayName,
          email,
          uid,
          tag,
          dateOfJoining: data.user.metadata.creationTime,
          photoURL,
        });
      }
      toast.success('Successfull login');
      return data;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  signUpUserWithEmail: async function ({ email, password }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success('Welcome to X');
      return userCredential;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  signInUserWithEmail: async function ({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success('Successfull login');
      return userCredential;
    } catch (error) {
      toast.error('Incorrect entered data');
      return error;
    }
  },
  signOutUser: async function () {
    try {
      await auth.signOut();
      toast.success('You have logged out');
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  changePassword: async function (currentPass, newPass) {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Користувач не автентифікований.');
    }
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPass);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPass);
      toast.success('Password successfully changed');
    } catch (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  },
};
