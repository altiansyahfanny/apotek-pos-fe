import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
};

const doctorSlice = createSlice({
	name: 'doctor',
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

export const { setLimit, setKeySearch } = doctorSlice.actions;

export default doctorSlice.reducer;

export const getDoctorState = (state) => state.doctor;
