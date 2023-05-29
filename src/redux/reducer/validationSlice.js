import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	errors: [],
};

export const validationSlice = createSlice({
	name: 'validation',
	initialState,
	reducers: {
		setErrors: (state, action) => {
			state.errors = action.payload;
		},
		resetErrors: (state) => {
			state.errors = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { setErrors, resetErrors } = validationSlice.actions;

export const getErrors = (state) => state.validation.errors;

export default validationSlice.reducer;
