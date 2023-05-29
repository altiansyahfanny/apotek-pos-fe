import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	form: {
		warehouse_id: '',
		supplier_id: '',
		invoice_number: '',
		order_letter_number: '',
		date: '',
		receipt_date: '',
		total_amount: 0,
		payment_method: '',
		payment_status: '',
		payment_account: '',
		due_date: '',
		tax_category: 0,
		tax: 0,
		cashback: 0,
		other_cost: 0,
		file_name: '',
		products: [],
	},
};

const addPurchaseSlice = createSlice({
	name: 'add_purchase',
	initialState,
	reducers: {
		setForm: (state, actions) => {
			state.form = { ...state.form, [actions.payload.key]: actions.payload.value };
		},
		resetForm: (state, actions) => {
			state.form = initialState.form;
		},
	},
});

export const { setForm, resetForm } = addPurchaseSlice.actions;

export default addPurchaseSlice.reducer;

export const getAddPurchaseState = (state) => state.add_purchase;
export const getAddPurchaseFormState = (state) => state.add_purchase.form;
