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
};

const userSlice = createSlice({
	name: 'user',
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

export const { setQuery, setModalDialog } = userSlice.actions;

export default userSlice.reducer;

export const getUserState = (state) => state.user;
export const getUserQueryState = (state) => state.user.query;
export const getUserModalState = (state) => state.user.modal_dialog;
