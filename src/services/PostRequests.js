import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-toastify';

export const PostRequests = {
  getPosts: async (limitPosts) => {
    try {
      const postsCollection = collection(db, 'posts');
      const postsQuery = query(
        postsCollection,
        orderBy('createdAt', 'desc'),
        limit(limitPosts)
      );

      const postsSnapshot = await getDocs(postsQuery);

      const postsData = postsSnapshot.docs.map((doc) => doc.data());

      return postsData;
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error(error.message);
      return [];
    }
  },
  getPost: async (id) => {
    try {
      const postRef = doc(db, 'posts', id);
      const docSnap = await getDoc(postRef);
      const data = docSnap.data();
      return data;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getFeed: async (userId) => {
    try {
      if (!userId) {
        return [];
      }
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error('User not found');
      }
      const userData = userSnap.data();
      const userFollowing = userData.following;

      if (!userFollowing || userFollowing.length === 0) {
        return [];
      }

      const postsRef = collection(db, 'posts');
      const postsQ = query(postsRef, where('authorUid', 'in', userFollowing));
      const postsSnap = await getDocs(postsQ);
      const data = postsSnap.docs.map((doc) => doc.data());
      return data;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  addPost: async (postData) => {
    try {
      await setDoc(doc(db, 'posts', postData.postId), postData);
     
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  addPostReply: async (replyPostData) => {
    try {
      await setDoc(doc(db, 'posts', replyPostData.postId), replyPostData);
      const parentPostRef = doc(db, 'posts', replyPostData.parentPostId);
      await updateDoc(parentPostRef, {
        replies: arrayUnion(replyPostData.postId),
      });
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  deletePost: async ({ postId, parentPostId }) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);
      if (parentPostId) {
        const parentPostRef = doc(db, 'posts', parentPostId);

        await updateDoc(parentPostRef, {
          replies: arrayRemove(postId),
        });
      }
      toast.success('Post was deleted');

      return `Post with ID ${postId} was successfully deleted.`;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  toggleLike: async ({ postId, userTag }) => {
    const postRef = doc(db, 'posts', postId);
    try {
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const likes = postData.likes || [];

        if (likes.includes(userTag)) {
          await updateDoc(postRef, {
            likes: arrayRemove(userTag),
          });
        } else {
          await updateDoc(postRef, {
            likes: arrayUnion(userTag),
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getLikeStatus: async ({ postId, userTag }) => {
    const postRef = doc(db, 'posts', postId);
    try {
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const likes = postData.likes || [];
        return likes.includes(userTag);
      } else {
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  incrementCountViews: async (postId) => {
    const docRef = doc(db, 'posts', postId);
    try {
      await updateDoc(docRef, { numberOfViews: increment(1) });
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
  getNumberViews: async (postId) => {
    const docRef = doc(db, 'posts', postId);
    try {
      const postSnap = await getDoc(docRef);
      return postSnap.data().numberOfViews;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  },
};
