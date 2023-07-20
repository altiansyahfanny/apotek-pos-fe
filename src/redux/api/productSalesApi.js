import { apiSlice } from './apiSlice';

export const productSalesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProductSalesByProductId: builder.query({
			query: ({ id, current_page, per_page }) =>
				`/product-sales/product/${id}?current_page=${current_page}&per_page=${per_page}`,
			providesTags: ['ProductSales'],
		}),
	}),
});

export const { useGetProductSalesByProductIdQuery } = productSalesApi;
