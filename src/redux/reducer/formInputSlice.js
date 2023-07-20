import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	input_select_is_open: false,
};

const formInputSlice = createSlice({
	name: 'form_input',
	initialState,
	reducers: {
		setInputSelect: (state, actions) => {
			state.input_select_is_open = actions.payload;
		},
	},
});

export const { setInputSelect } = formInputSlice.actions;

export default formInputSlice.reducer;

export const getFormInputState = (state) => state.form_input;
