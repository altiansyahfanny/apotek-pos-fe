import { apiSlice } from './apiSlice';

export const saleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSales: builder.query({
			query: ({ per_page, current_page, start_date, end_date }) =>
				`sale?current_page=${current_page}&per_page=${per_page}&start_date=${start_date}&end_date=${end_date}`,

			providesTags: ['Sale'],
		}),
		getSaleById: builder.query({
			query: (id) => `sale/${id}`,
			transformResponse: ({ data }) => {
				return data;
			},
		}),
		getPendingSales: builder.query({
			query: () => `sale/pending`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['PendingSale'],
		}),
		createSale: builder.mutation({
			query: (data) => ({
				url: 'sale',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Sale', 'Product', 'PendingSale', 'ProductSales'],
		}),
		updatePendingSale: builder.mutation({
			query: (data) => ({
				url: 'sale/pending',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Sale', 'Product', 'PendingSale'],
		}),
		deletePendingSale: builder.mutation({
			query: (id) => ({
				url: `sale/pending/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Sale', 'Product', 'PendingSale'],
		}),
		deleteSale: builder.mutation({
			query: (id) => ({
				url: `sale/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Sale', 'Product'],
		}),
	}),
});

export const {
	useCreateSaleMutation,
	useGetSalesQuery,
	useGetSaleByIdQuery,
	useGetPendingSalesQuery,
	useUpdatePendingSaleMutation,
	useDeletePendingSaleMutation,
	useDeleteSaleMutation,
} = saleApi;
