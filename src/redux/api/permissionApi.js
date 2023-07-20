import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPermissions: builder.query({
			query: () => `permission`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Permission'],
		}),
		getPermissionModule: builder.query({
			query: (id) => `permission/${id}`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['UserAcess', 'Permission'],
		}),
		updatePermission: builder.mutation({
			query: ({ data, id }) => ({
				url: `permission/${id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['UserAcess', 'Permission'],
		}),
	}),
});

export const { useGetPermissionsQuery, useGetPermissionModuleQuery, useUpdatePermissionMutation } =
	userApi;
