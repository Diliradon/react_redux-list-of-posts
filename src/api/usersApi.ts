import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserData } from '../types/User';
import { BASE_URL } from '../utils/fetchClient';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'User' as const, id })), 'User']
          : ['User'],
    }),
    getUser: builder.query<User, number>({
      query: idUser => `/users/${idUser}`,
    }),
    addNewUser: builder.mutation<UserData, Partial<UserData>>({
      query: newUser => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<User, number>({
      query: idUser => ({
        url: `/users/${idUser}`,
        method: 'DELETE',
        body: idUser,
      }),
      invalidatesTags: ['User'],
    }),
    editUser: builder.mutation<User, Partial<User>>({
      query: user => ({
        url: `/users/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = usersApi;
