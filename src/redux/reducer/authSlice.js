import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	access_token: null,
	user: {},
	permissions: {},
	form: { username: 'owner', password: '1234' },
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.access_token = action.payload;
		},
		setPermissions: (state, action) => {
			state.permissions = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logOut: (state) => {
			state.access_token = null;
			state.user = null;
		},
		setForm: (state, actions) => {
			state.form = { ...state.form, [actions.payload.key]: actions.payload.value };
		},
		setAllForm: (state, actions) => {
			state.form = actions.payload;
		},
		resetForm: (state, actions) => {
			state.form = initialState.form;
		},
	},
});

export const { setAccessToken, setPermissions, resetForm, setAllForm, setForm, setUser, logOut } =
	authSlice.actions;

export const getAccessToken = (state) => state.auth.access_token;
export const getPermissions = (state) => state.auth.permissions;
export const getAuthFormState = (state) => state.auth.form;
export const getAuthUserState = (state) => state.auth.user;
// export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
