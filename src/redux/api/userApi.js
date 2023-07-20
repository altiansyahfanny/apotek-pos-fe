import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => `user`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['User'],
		}),
		getUsersWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`user/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
			providesTags: ['User'],
		}),
		createUser: builder.mutation({
			query: (data) => ({
				url: 'user',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: 'user',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useCreateUserMutation,
	useGetUsersQuery,
	useGetUsersWithPaginationQuery,
	useUpdateUserMutation,
} = userApi;
