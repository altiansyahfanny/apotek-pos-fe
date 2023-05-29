import { apiSlice } from './apiSlice';

export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => `/product`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Product'],
		}),
		createProduct: builder.mutation({
			query: (data) => ({
				url: 'product',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;
