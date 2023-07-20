import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal_dialog: {
		modal_add_customer_is_open: false,
		modal_add_doctor_is_open: false,
		modal_add_product_unit_is_open: false,
	},
};

const componentSlice = createSlice({
	name: 'component',
	initialState,
	reducers: {
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},
	},
});

export const { setModalDialog } = componentSlice.actions;

export default componentSlice.reducer;

export const getComponentState = (state) => state.component;
export const getComponentModalState = (state) => state.component.modal_dialog;
