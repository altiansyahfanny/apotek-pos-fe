import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
};

const userSlice = createSlice({
	name: 'user',
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

export const { setLimit, setKeySearch } = userSlice.actions;

export default userSlice.reducer;

export const getUserState = (state) => state.user;
