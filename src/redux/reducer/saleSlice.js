import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
	query: {
		limit: 10,
		current_page: 1,
		key_search: '',
		warehouse_id: 1,
		date: {
			start_date: moment(moment().startOf('month').toDate()).format('DD-MM-YYYY'),
			end_date: moment(moment().endOf('month').toDate()).format('DD-MM-YYYY'),
			key: 'selection',
		},
	},

	modal_dialog: {
		modal_alert_delete_is_open: false,
	},
};

const saleSlice = createSlice({
	name: 'sale',
	initialState,
	reducers: {
		setQuery: (state, actions) => {
			state.query = { ...state.query, [actions.payload.key]: actions.payload.value };
		},
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setQuery, setModalDialog } = saleSlice.actions;

export default saleSlice.reducer;

export const getSaleState = (state) => state.sale;
export const getSaleQueryState = (state) => state.sale.query;
export const getSaleModalState = (state) => state.sale.modal_dialog;
