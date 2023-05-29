import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
};

const productUnitSlice = createSlice({
	name: 'productUnit',
	initialState,
	reducers: {
		setLimit: (state, actions) => {
			state.limit = Number(actions.payload);
		},
		setKeySearch: (state, actions) => {
			state.key_search = actions.payload;
		},
	},
});

export const { setLimit, setKeySearch } = productUnitSlice.actions;

export default productUnitSlice.reducer;

export const getproductUnitState = (state) => state.product_unit;
