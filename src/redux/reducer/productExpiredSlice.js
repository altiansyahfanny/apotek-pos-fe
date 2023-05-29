import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	warehouse_id: 1,
};

const productExpiredSlice = createSlice({
	name: 'product_expired',
	initialState,
	reducers: {
		setLimit: (state, actions) => {
			state.limit = Number(actions.payload);
		},
		setKeySearch: (state, actions) => {
			state.key_search = actions.payload;
		},
		setWarehouse: (state, actions) => {
			state.warehouse_id = actions.payload;
		},
	},
});

export const { setLimit, setKeySearch, setWarehouse } = productExpiredSlice.actions;

export default productExpiredSlice.reducer;

export const getProductExpiredState = (state) => state.product_expired;
export const getLimit = (state) => state.product_expired.limit;
export const getKeySearch = (state) => state.product_expired.key_search;
