/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comments'],
  endpoints: builder => ({
    getPostComments: builder.query<Comment[], number>({
      query: postId => `/comments?postId=${postId}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comments' as const, id })),
              'Comments',
            ]
          : ['Comments'],
    }),

    addNewPostComment: builder.mutation<CommentData, Partial<CommentData>>({
      query: newComment => ({
        url: '/comments',
        method: 'POST',
        body: newComment,
      }),
      invalidatesTags: ['Comments'],
    }),

    deleteComment: builder.mutation<Comment, number>({
      query: commentId => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
        body: commentId,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetPostCommentsQuery,
  useAddNewPostCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
