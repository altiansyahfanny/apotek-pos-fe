import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
	form: {
		reference_number: 'PN' + new Date().getTime(),
		service_fee: 0,
		embalase_fee: 0,
		shipping_costs: 0,
		discount: 0,
		tax: 0,
		selling_via: 'Offline',
		date: moment().format('YYYY-MM-DDTHH:mm'),
		customer_id: 1,
		doctor_id: '',
		status: 1,
		total_paid: 0,
		debt: 0, // piutang
		payment_account: 'Cash',
		payment_method: 'Tunai',
		due_date: '',
		notes: '',

		products: [],

		warehouse_id: '',
	},
	modal_dialog: {
		modal_paid_is_open: false,
	},
};

const posSlice = createSlice({
	name: 'pos',
	initialState,
	reducers: {
		setForm: (state, actions) => {
			state.form = { ...state.form, [actions.payload.key]: actions.payload.value };
		},
		resetForm: (state, actions) => {
			state.form = initialState.form;
		},
		setAllForm: (state, actions) => {
			state.form = actions.payload;
		},
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setForm, resetForm, setAllForm, setModalDialog } = posSlice.actions;

export default posSlice.reducer;

export const getPosState = (state) => state.pos;
export const getForm = (state) => state.pos.form;
export const getPosModalDialogState = (state) => state.pos.modal_dialog;
