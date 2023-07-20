import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	query: {
		limit: 10,
		current_page: 1,
	},
};

const productSaleSlice = createSlice({
	name: 'product_sale',
	initialState,
	reducers: {
		setQuery: (state, actions) => {
			state.query = { ...state.query, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setQuery } = productSaleSlice.actions;

export default productSaleSlice.reducer;

export const getProductSaleState = (state) => state.product_sale;
export const getProductSaleQueryState = (state) => state.product_sale.query;
