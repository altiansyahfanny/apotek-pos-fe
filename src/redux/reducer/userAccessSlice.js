import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
};

const userAccessSlice = createSlice({
	name: 'userAccess',
	initialState,
	reducers: {
		setLimit: (state, actions) => {
			state.limit = Number(actions.payload);
		},
		setKeySearch: (state, actions) => {
			state.key_search = actions.payload;
		},
	},
});

export const { setLimit, setKeySearch } = userAccessSlice.actions;

export default userAccessSlice.reducer;

export const getUserAccessState = (state) => state.user_access;
