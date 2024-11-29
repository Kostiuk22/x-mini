import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-toastify';

export const ProfileRequests = {
  getPostsByUserTag: async (tag) => {
    try {
      const usersRef = collection(db, 'users');
      const userQ = query(usersRef, where('tag', '==', tag));
      const usersSnapshot = await getDocs(userQ);

      if (usersSnapshot.empty) {
        throw new Error('User not found');
      }
      const userUid = usersSnapshot.docs[0].data().uid;

      const postsRef = collection(db, 'posts');
      const postsQ = query(postsRef, where('authorUid', '==', userUid));
      const postsSnapshot = await getDocs(postsQ);
      if (usersSnapshot.empty) {
        throw new Error('Posts not found');
      }
      return postsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      return error;
    }
  },

  getMediaByUserTag: async (tag) => {
    try {
      const usersRef = collection(db, 'users');
      const userQ = query(usersRef, where('tag', '==', tag));
      const usersSnapshot = await getDocs(userQ);

      if (usersSnapshot.empty) {
        throw new Error('User not found');
      }

      const userUid = usersSnapshot.docs[0].data().uid;

      const postsRef = collection(db, 'posts');
      const postsQ = query(postsRef, where('authorUid', '==', userUid));
      const postsSnapshot = await getDocs(postsQ);

      if (postsSnapshot.empty) {
        return [];
      }

      const mediaFiles = postsSnapshot.docs
        .map((doc) => doc.data().media)
        .filter((media) => media && media.length > 0)
        .flat();

      return mediaFiles;
    } catch (error) {
      return error;
    }
  },
  getLikedPostsByUser: async (userTag) => {
    try {
      const postsRef = collection(db, 'posts');
      const postsQ = query(postsRef, where('likes', 'array-contains', userTag));
      const qSnapshot = await getDocs(postsQ);
      const likedPosts = [];
      qSnapshot.forEach((doc) => {
        likedPosts.push(doc.data());
      });

      return likedPosts;
    } catch (error) {
      return error;
    }
  },

  toggleBookmarks: async ({ userTag, postId }) => {
    try {
      const usersRef = collection(db, 'users');
      const userQ = query(usersRef, where('tag', '==', userTag));
      const qSnapshot = await getDocs(userQ);
      const userDoc = qSnapshot.docs[0];
      const bookmarks = userDoc.data().bookmarks;
      const uid = userDoc.data().uid;

      const userRef = doc(db, 'users', uid);

      if (bookmarks.includes(postId)) {
        await updateDoc(userRef, { bookmarks: arrayRemove(postId) });
        toast.success('Removed from bookmarks')
        return { status: 'deleted', postId };
      } else {
        await updateDoc(userRef, { bookmarks: arrayUnion(postId) });
        toast.success('Added to your bookmarks')
        return { status: 'added', postId };
      }
    } catch (error) {
      return error;
    }
  },

  getBookmarkedPosts: async (ids) => {
    try {
      if (!ids || ids.length === 0) {
        return [];
      }

      const postsRef = collection(db, 'posts');
      const q = query(postsRef, where('__name__', 'in', ids));
      const qSnapshot = await getDocs(q);

      const posts = qSnapshot.docs.map((doc) => doc.data());

      return posts;
    } catch (error) {
      return error;
    }
  },
  deleteAllBookmarks: async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { bookmarks: [] });
      toast.success('All bookmarks was deleted')
    } catch (error) {
      return error;
    }
  },
};
