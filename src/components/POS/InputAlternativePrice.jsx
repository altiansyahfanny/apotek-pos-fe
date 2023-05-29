import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import InputSelect from './InputSelect';

const InputAlternativePrice = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);

	const handleChange = (e) => {
		let form = [...products];

		// jika select custum price
		if (Number(e.target.value) === 2) {
			dispatch(setForm({ key: 'is_custom_price', value: true }));

			form[index] = {
				...form[index],
				price: 0,
				product_subtotal: form[index].product_qty * 0,
			};
		} else {
			dispatch(setForm({ key: 'is_custom_price', value: false }));

			form[index] = {
				...form[index],
				price: form[index].product_units[0].price,
				product_subtotal: form[index].product_qty * form[index].product_units[0].price,
			};
		}

		dispatch(setForm({ key: 'products', value: form }));
	};
	return (
		<div>
			<InputSelect onChange={handleChange}>
				<option value={1}>Harga Utama</option>
				<option value={2}>Atur Harga</option>
			</InputSelect>
		</div>
	);
};

export default InputAlternativePrice;
