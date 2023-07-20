import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	query: {
		limit: 10,
		current_page: 1,
		key_search: '',
		warehouse_id: 1,
	},
	modal_dialog: {
		modal_add_is_open: false,
		modal_detail_is_open: false,
		modal_alert_delete_is_open: false,
	},
	form: {
		name: '',
		product_unit_id: '',
		note: '',
		product_concoctions: [],
		is_edit: false,
	},
};

const concoctionSlice = createSlice({
	name: 'concoction',
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

export const { setQuery, setForm, resetForm, setModalDialog, setAllForm } = concoctionSlice.actions;

export default concoctionSlice.reducer;

export const getConcoctionState = (state) => state.concoction;
export const getConcoctionQueryState = (state) => state.concoction.query;
export const getConcoctionFormState = (state) => state.concoction.form;
export const getConcoctionModalState = (state) => state.concoction.modal_dialog;
