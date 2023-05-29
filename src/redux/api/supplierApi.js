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
		createSupplier: builder.mutation({
			query: (data) => ({
				url: 'supplier',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Supplier'],
		}),
	}),
});

export const { useCreateSupplierMutation, useGetSuppliersQuery } = supplierApi;
