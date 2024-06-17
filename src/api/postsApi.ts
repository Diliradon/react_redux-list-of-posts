import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, PostData } from '../types/Post';
import { BASE_URL } from '../utils/fetchClient';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),

    getUserPosts: builder.query<Post[], number>({
      query: userId => `/posts?userId=${userId}`,
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
          : ['Post'],
    }),

    addNewPost: builder.mutation<PostData, Partial<PostData>>({
      query: newPost => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation<Post, number>({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
        body: postId,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation<Post, Partial<Post>>({
      query: post => ({
        url: `/users/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetUserPostsQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postsApi;
