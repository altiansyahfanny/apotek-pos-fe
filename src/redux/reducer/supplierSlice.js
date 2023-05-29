import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	form: {
		name: '',
		email: '',
		phone_number: '',
		address: '',
		status: 1,
	},
	modal_dialog: {
		modal_add_is_open: false,
	},
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
		setForm: (state, actions) => {
			state.form = { ...state.form, [actions.payload.key]: actions.payload.value };
		},
		resetForm: (state, actions) => {
			state.form = initialState.form;
		},
		setModalDialog: (state, actions) => {
			console.log('action : ', actions);

			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setLimit, setKeySearch, setForm, resetForm, setModalDialog } = supplierSlice.actions;

export default supplierSlice.reducer;

export const getSupplierState = (state) => state.supplier;
export const getSupplierFormState = (state) => state.supplier.form;
export const getSupplierModalDialogState = (state) => state.supplier.modal_dialog;
