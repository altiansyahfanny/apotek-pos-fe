import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	warehouse_id: 1,
	modal_dialog: {
		modal_add_is_open: false,
	},
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setLimit: (state, actions) => {
			state.limit = Number(actions.payload);
		},
		setKeySearch: (state, actions) => {
			state.key_search = actions.payload;
		},
		setWarehouse: (state, actions) => {
			state.warehouse_id = actions.payload;
		},
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setLimit, setKeySearch, setWarehouse, setModalDialog } = productSlice.actions;

export default productSlice.reducer;

export const getProductState = (state) => state.product;
export const getProductModalState = (state) => state.product.modal_dialog;
