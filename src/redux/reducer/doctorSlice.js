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
		sip: '',
		specialization: '',
		phone_number: '',
		email: '',
		address: '',
		status: true,
		is_edit: false,
	},
};

const doctorSlice = createSlice({
	name: 'doctor',
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

export const { setQuery, setModalDialog, setForm, resetForm, setAllForm } = doctorSlice.actions;

export default doctorSlice.reducer;

export const getDoctorState = (state) => state.doctor;
export const getDoctorFormState = (state) => state.doctor.form;
export const getDoctorQueryState = (state) => state.doctor.query;
export const getDoctorModalState = (state) => state.doctor.modal_dialog;
