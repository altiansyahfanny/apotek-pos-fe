import { apiSlice } from './apiSlice';

export const warehouseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWarehouses: builder.query({
			query: () => `warehouse`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Warehouse'],
		}),
		createWarehouse: builder.mutation({
			query: (data) => ({
				url: 'warehouse',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Warehouse'],
		}),
	}),
});

export const { useCreateWarehouseMutation, useGetWarehousesQuery } = warehouseApi;
