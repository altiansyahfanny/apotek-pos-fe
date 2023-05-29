import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	form: {
		service_fee: 0,
		embalase_fee: 0,
		shipping_costs: 0,
		discount: 0,
		products: [],

		is_custom_price: false,
	},
};

const posSlice = createSlice({
	name: 'pos',
	initialState,
	reducers: {
		setForm: (state, actions) => {
			state.form = { ...state.form, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setForm } = posSlice.actions;

export default posSlice.reducer;

export const getPosState = (state) => state.pos;
export const getForm = (state) => state.pos.form;
