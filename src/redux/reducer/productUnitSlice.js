import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	form: {
		name: '',
	},
};

const productUnitSlice = createSlice({
	name: 'product_unit',
	initialState,
	reducers: {
		setLimit: (state, actions) => {
			state.limit = Number(actions.payload);
		},
		setKeySearch: (state, actions) => {
			state.key_search = actions.payload;
		},
		setForm: (state, actions) => {
			state.form = { ...state.form, [actions.payload.key]: actions.payload.value };
		},

		setAllForm: (state, actions) => {
			state.form = actions.payload;
		},

		resetForm: (state, actions) => {
			state.form = initialState.form;
		},
	},
});

export const { setLimit, setKeySearch, setAllForm, setForm, resetForm } = productUnitSlice.actions;

export default productUnitSlice.reducer;

export const getproductUnitState = (state) => state.product_unit;
export const getProductUnitFormState = (state) => state.product_unit.form;
export const getProductUnitModalState = (state) => state.product_unit.modal_dialog;
