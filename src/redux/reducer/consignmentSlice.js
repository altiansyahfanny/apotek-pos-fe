import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	warehouse_id: 1,
};

const consignmentSlice = createSlice({
	name: 'consignment',
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

export const { setLimit, setKeySearch, setWarehouse } = consignmentSlice.actions;

export default consignmentSlice.reducer;

export const getConsignmentState = (state) => state.consignment;
