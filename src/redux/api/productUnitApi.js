import { apiSlice } from './apiSlice';

export const productUnitApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProductUnits: builder.query({
			query: () => `/product-unit`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['ProductUnit'],
		}),
		createProductUnit: builder.mutation({
			query: (data) => ({
				url: 'product-unit',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['ProductUnit'],
		}),
	}),
});

export const { useGetProductUnitsQuery, useCreateProductUnitMutation } = productUnitApi;
