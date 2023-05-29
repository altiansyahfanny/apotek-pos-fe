import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	warehouse_id: 1,
};

const prescriptionSlice = createSlice({
	name: 'prescription',
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

export const { setLimit, setKeySearch, setWarehouse } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

export const getPrescriptionState = (state) => state.prescription;
