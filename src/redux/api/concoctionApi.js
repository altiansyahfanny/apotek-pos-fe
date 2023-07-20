import { apiSlice } from './apiSlice';

export const concoctionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConcoctions: builder.query({
			query: () => `/concoction`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Concoction'],
		}),
		getConcoctionsWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`/concoction/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
			providesTags: ['Concoction'],
		}),
		createConcoction: builder.mutation({
			query: (data) => ({
				url: 'concoction',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Concoction'],
		}),
		updateConcoction: builder.mutation({
			query: (data) => ({
				url: 'concoction',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Concoction'],
		}),
		deleteConcoction: builder.mutation({
			query: (id) => ({
				url: `concoction/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Concoction'],
		}),
	}),
});

export const {
	useGetConcoctionsQuery,
	useCreateConcoctionMutation,
	useGetConcoctionsWithPaginationQuery,
	useDeleteConcoctionMutation,
	useUpdateConcoctionMutation,
} = concoctionApi;
