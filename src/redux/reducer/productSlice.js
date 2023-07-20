import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	query: {
		limit: 10,
		key_search: '',
		warehouse_id: 1,
		current_page: 1,
	},
	modal_dialog: {},
};

const productSlice = createSlice({
	name: 'product',
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

export const { setQuery, setModalDialog } = productSlice.actions;

export default productSlice.reducer;

export const getProductState = (state) => state.product;
export const getProductQueryState = (state) => state.product.query;
export const getProductModalState = (state) => state.product.modal_dialog;
