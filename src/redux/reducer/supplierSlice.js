import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
};

const supplierSlice = createSlice({
	name: 'supplier',
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

export const { setLimit, setKeySearch } = supplierSlice.actions;

export default supplierSlice.reducer;

export const getSupplierState = (state) => state.supplier;
