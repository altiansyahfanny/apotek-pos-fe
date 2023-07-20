import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	query: {
		limit: 10,
		current_page: 1,
	},
};

const productPurchaseSlice = createSlice({
	name: 'product_purchase',
	initialState,
	reducers: {
		setQuery: (state, actions) => {
			state.query = { ...state.query, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setQuery } = productPurchaseSlice.actions;

export default productPurchaseSlice.reducer;

export const getProductPurchaseState = (state) => state.product_purchase;
export const getProductPurchaseQueryState = (state) => state.product_purchase.query;
