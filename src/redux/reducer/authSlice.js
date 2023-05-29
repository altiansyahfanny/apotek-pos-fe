import { createSlice } from '@reduxjs/toolkit';

const initialState = { access_token: null, user: {} };

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.access_token = action.payload;
		},

		logout: (state) => {
			state.access_token = null;
			state.refresh_token = null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAccessToken, logout, setUser } = authSlice.actions;

export const getAccessToken = (state) => state.auth.access_token;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
