import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	query: {
		limit: 10,
		current_page: 1,
		key_search: '',
	},
	modal_dialog: {
		modal_add_is_open: false,
	},
	form: {
		name: '',
		email: '',
		phone_number: '',
		address: '',
		status: 1,
		is_edit: false,
	},
};

const supplierSlice = createSlice({
	name: 'supplier',
	initialState,
	reducers: {
		setQuery: (state, actions) => {
			state.query = { ...state.query, [actions.payload.key]: actions.payload.value };
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
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setQuery, setForm, setAllForm, resetForm, setModalDialog } = supplierSlice.actions;

export default supplierSlice.reducer;

export const getSupplierState = (state) => state.supplier;
export const getSupplierFormState = (state) => state.supplier.form;
export const getSupplierQueryState = (state) => state.supplier.query;
export const getSupplierModalDialogState = (state) => state.supplier.modal_dialog;
