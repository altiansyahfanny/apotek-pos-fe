import React from 'react';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import { useDispatch, useSelector } from 'react-redux';

const InputPrice = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);

	const onChange = (e) => {
		const value = Number(e.target.value);
		const form = [...products];
		form[index] = {
			...form[index],
			price: value,
			product_subtotal: value * form[index].product_qty,
		};

		dispatch(setForm({ key: 'products', value: form }));
	};

	return (
		<input
			type="number"
			value={products[index].price}
			onChange={onChange}
			className="w-24 pl-2 pr-1 py-1 border border-gray-500 text-xs focus:outline-none focus:border-green_tea focus:ring-0 rounded transition"
		/>
	);
};

export default InputPrice;
