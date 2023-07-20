import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

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
		member_code: 'MC' + moment().format('YYYYMMDDHHmmss'),
		phone_number: '',
		birth_date: '',
		email: '',
		address: '',
		status: true,
		is_edit: false,
	},
};

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setQuery: (state, actions) => {
			state.query = { ...state.query, [actions.payload.key]: actions.payload.value };
		},
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
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

export const { setQuery, setForm, resetForm, setModalDialog, setAllForm } = customerSlice.actions;

export default customerSlice.reducer;

export const getCustomerState = (state) => state.customer;
export const getCustomerFormState = (state) => state.customer.form;
export const getCustomerQueryState = (state) => state.customer.query;
export const getCustomerModalState = (state) => state.customer.modal_dialog;
