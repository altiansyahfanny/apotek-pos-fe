import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	limit: 10,
	key_search: '',
	warehouse_id: 1,

	expired_date: {
		filter_date: {
			value: { filter_id: 1, filter_name: 'Sudah Kadaluarsa' },
			options: [
				{ filter_id: 1, filter_name: 'Sudah Kadaluarsa' },
				{ filter_id: 2, filter_name: 'Exp. dalam 3 bulan' },
				{ filter_id: 3, filter_name: 'Exp. dalam 6 bulan' },
				{ filter_id: 4, filter_name: 'Exp. dalam 12 bulan' },
				{ filter_id: 5, filter_name: 'Custom' },
			],
		},
	},
};

const productDetailSlice = createSlice({
	name: 'product_detail',
	initialState,
	reducers: {
		setLimit: (state, actions) => {
			state.limit = Number(actions.payload);
		},
		setKeySearch: (state, actions) => {
			state.key_search = actions.payload;
		},
		setWarehouse: (state, actions) => {
			state.warehouse_id = actions.payload;
		},

		setFilterDateExpDate: (state, actions) => {
			state.expired_date.filter_date.value = actions.payload;
		},
	},
});

export const { setLimit, setKeySearch, setWarehouse, setFilterDateExpDate } =
	productDetailSlice.actions;

export default productDetailSlice.reducer;

export const getProductDetailState = (state) => state.product_detail;
