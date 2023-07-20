import { apiSlice } from './apiSlice';

export const customerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCustomers: builder.query({
			query: () => `customer`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Customer'],
		}),
		getCustomersWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`customer/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
			providesTags: ['Customer'],
		}),
		createCustomer: builder.mutation({
			query: (data) => ({
				url: 'customer',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Customer'],
		}),
		updateCustomer: builder.mutation({
			query: (data) => ({
				url: 'customer',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Customer'],
		}),
	}),
});

export const {
	useCreateCustomerMutation,
	useGetCustomersQuery,
	useGetCustomersWithPaginationQuery,
	useUpdateCustomerMutation,
} = customerApi;
