import { apiSlice } from './apiSlice';

export const invoiceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInvoices: builder.query({
			query: () => `/invoice`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Invoice'],
		}),
		createInvoice: builder.mutation({
			query: (data) => ({
				url: 'invoice',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Invoice', 'Product', 'Purchase'],
		}),
	}),
});

export const { useGetInvoicesQuery, useCreateInvoiceMutation } = invoiceApi;
