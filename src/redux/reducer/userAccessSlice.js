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
	form: [],
};

const userAccessSlice = createSlice({
	name: 'user_access',
	initialState,
	reducers: {
		setQuery: (state, actions) => {
			state.query = { ...state.query, [actions.payload.key]: actions.payload.value };
		},
		setModalDialog: (state, actions) => {
			state.modal_dialog = { ...state.modal_dialog, [actions.payload.key]: actions.payload.value };
		},

		setAllForm: (state, actions) => {
			state.form = actions.payload;
		},
	},
});

export const { setQuery, setModalDialog, setAllForm } = userAccessSlice.actions;

export default userAccessSlice.reducer;

export const getUserAccessState = (state) => state.user_access;
export const getUserAccessQueryState = (state) => state.user_access.query;
export const getUserAccessModalState = (state) => state.user_access.modal_dialog;
export const getUserAccessFormState = (state) => state.user_access.form;
