import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';

const initialState = {
	query: {
		limit: 10,
		current_page: 1,
		key_search: '',
		warehouse_id: 1,
	},
	modal_dialog: {
		modal_accept_is_open: false,
		modal_detail_is_open: false,
		modal_alert_delete_is_open: false,
	},
	form: {
		name: '',
		code: 'RES' + new Date().getTime(),
		date: moment().format('YYYY-MM-DDTHH:mm'),
		customer_id: 1,
		customer: {},
		doctor_id: '',
		doctor: {},
		note: '',
		embalase_fee: 0,
		service_fee: 0,
		status: 3,
		prescription_details: [{ content: '', is_edit: false }],
		warehouse_id: '',
		product_prescriptions: [],

		is_edit: false,
	},
};

const prescriptionSlice = createSlice({
	name: 'prescription',
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

export const { setQuery, setForm, resetForm, setModalDialog, setAllForm } =
	prescriptionSlice.actions;

export default prescriptionSlice.reducer;

export const getPrescriptionState = (state) => state.prescription;
export const getPrescriptionFormState = (state) => state.prescription.form;
export const getPrescriptionModalState = (state) => state.prescription.modal_dialog;
export const getPrescriptionQueryState = (state) => state.prescription.query;
