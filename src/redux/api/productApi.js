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
		getProductById: builder.query({
			query: (id) => `/product/${id}`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Product'],
		}),
		getProductsWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`product/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
			providesTags: ['Product'],
		}),
		getProductPurchasesWithPaginationById: builder.query({
			query: ({ id, per_page, current_page, key_search }) =>
				`product/purchases/${id}?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
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
		updateProduct: builder.mutation({
			query: (data) => ({
				url: 'product',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useCreateProductMutation,
	useGetProductsWithPaginationQuery,
	useGetProductByIdQuery,
	useGetProductPurchasesWithPaginationByIdQuery,
	useUpdateProductMutation,
} = productApi;
