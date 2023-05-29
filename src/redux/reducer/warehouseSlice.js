import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
};

const warehouseSlice = createSlice({
	name: 'warehouse',
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

export const { setLimit, setKeySearch } = warehouseSlice.actions;

export default warehouseSlice.reducer;

export const getWarehouseState = (state) => state.warehouse;
