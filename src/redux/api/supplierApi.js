import { apiSlice } from './apiSlice';

export const supplierApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSuppliers: builder.query({
			query: () => `supplier`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Supplier'],
		}),
		getSuppliersWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`supplier/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
			providesTags: ['Supplier'],
		}),
		createSupplier: builder.mutation({
			query: (data) => ({
				url: 'supplier',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Supplier'],
		}),
		updateSupplier: builder.mutation({
			query: (data) => ({
				url: 'supplier',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Supplier'],
		}),
	}),
});

export const {
	useCreateSupplierMutation,
	useGetSuppliersQuery,
	useGetSuppliersWithPaginationQuery,
	useUpdateSupplierMutation,
} = supplierApi;
