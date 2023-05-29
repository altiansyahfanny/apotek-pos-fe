import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	form: {
		count_price_with_margin: true,
		profit_margin: 0,

		// form to send
		factory_name: '',
		product_category_id: '',
		product_unit_id: '',
		rack_id: '',
		product_status_id: '',
		minimum_stock: 0,
		capital_price: 0,
		price: 0,
		name: '',
		sku_code: '',
		barcode: '',
		active_substance: '',
		other_information: '',
		other_product_units: [],
		alternative_prices: [],
	},
};

const AddProductSlice = createSlice({
	name: 'add_product',
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

export const { setForm, resetForm } = AddProductSlice.actions;

export default AddProductSlice.reducer;

export const getAddProductState = (state) => state.add_product;
export const getAddProductFormState = (state) => state.add_product.form;
