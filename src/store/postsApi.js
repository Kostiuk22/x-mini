import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostRequests } from '../services/PostRequests';
import { ProfileRequests } from '../services/ProfileRequests';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Posts', 'LikedPosts'],
  endpoints: (builder) => ({
    getPost: builder.query({
      async queryFn(postId) {
        try {
          const post = await PostRequests.getPost(postId);
          return { data: post };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, postId) => {
        if (result) {
          return [{ type: 'Posts', id: postId }];
        }
        return [];
      },
    }),

    getPosts: builder.query({
      async queryFn(limitPosts) {
        try {
          const posts = await PostRequests.getPosts(limitPosts);

          return { data: posts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result.length > 0
          ? [
              ...result.map(({ postId }) => ({ type: 'Posts', id: postId })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    getPostsByUserTag: builder.query({
      async queryFn(userTag) {
        try {
          const posts = await ProfileRequests.getPostsByUserTag(userTag);
          return { data: posts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result.length > 0
          ? [
              ...result.map(({ postId }) => ({ type: 'Posts', id: postId })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    getFeed: builder.query({
      async queryFn(userId) {
        try {
          const feed = await PostRequests.getFeed(userId);
          return { data: feed };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result.length > 0
          ? [
              ...result.map(({ postId }) => ({ type: 'Posts', postId })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    addPost: builder.mutation({
      async queryFn(postData) {
        try {
          await PostRequests.addPost(postData);
          return { data: 'Post added successfully' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: () => [{ type: 'Posts', id: 'LIST' }],
    }),
    addReply: builder.mutation({
      async queryFn(replyPostData) {
        try {
          await PostRequests.addPostReply(replyPostData);
          return { data: 'Reply added successfully' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (replyPostData) => [
        { type: 'Posts', id: replyPostData.parentPostId },
        { type: 'Posts', id: 'LIST' },
      ],
    }),

    deletePost: builder.mutation({
      async queryFn(data) {
        try {
          await PostRequests.deletePost(data);
          return { data: 'Post was deleted' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, postId) => [
        { type: 'Posts', id: postId },
        { type: 'Posts', id: 'LIST' },
      ],
    }),

    toggleLike: builder.mutation({
      async queryFn({ postId, userTag }) {
        try {
          const isLiked = await PostRequests.toggleLike({ postId, userTag });
          return { data: isLiked };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, { postId, userTag }) => [
        { type: 'Posts', id: postId },
        { type: 'LikedPosts', id: userTag },
      ],
    }),

    getLikeStatus: builder.query({
      async queryFn({ postId, userTag }) {
        try {
          const isLiked = await PostRequests.getLikeStatus({ postId, userTag });
          return { data: isLiked };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, { postId }) => [
        { type: 'Posts', id: postId },
      ],
    }),

    incrementCountViews: builder.mutation({
      async queryFn(postId) {
        try {
          await PostRequests.incrementCountViews(postId);
          return { data: 'Counts was incremented' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, postId) => [
        { type: 'Posts', id: postId },
      ],
    }),

    getLikedPostsByUser: builder.query({
      async queryFn(userTag) {
        try {
          const likedPosts = await ProfileRequests.getLikedPostsByUser(userTag);
          return { data: likedPosts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, userTag) => [
        { type: 'LikedPosts', id: userTag },
        ...(result.length > 0
          ? result.map(({ postId }) => ({ type: 'Posts', id: postId }))
          : []),
      ],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useGetPostsByUserTagQuery,
  useAddPostMutation,
  useAddReplyMutation,
  useDeletePostMutation,
  useToggleLikeMutation,
  useGetLikeStatusQuery,
  useIncrementCountViewsMutation,
  useGetFeedQuery,
  useGetLikedPostsByUserQuery,
} = postsApi;
