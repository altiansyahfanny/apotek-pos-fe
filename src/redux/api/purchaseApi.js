import { apiSlice } from './apiSlice';

export const purchaseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPurchaseByProductId: builder.query({
			query: ({ id, current_page, per_page }) =>
				`/purchase/product/${id}?current_page=${current_page}&per_page=${per_page}`,
			providesTags: ['Purchase'],
		}),
	}),
});

export const { useGetPurchaseByProductIdQuery } = purchaseApi;
