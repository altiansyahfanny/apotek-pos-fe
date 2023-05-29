import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	warehouse_id: 1,
};

const concoctionSlice = createSlice({
	name: 'concoction',
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

export const { setLimit, setKeySearch, setWarehouse } = concoctionSlice.actions;

export default concoctionSlice.reducer;

export const getConcoctionState = (state) => state.concoction;
export const getLimit = (state) => state.concoction.limit;
export const getKeySearch = (state) => state.concoction.key_search;
