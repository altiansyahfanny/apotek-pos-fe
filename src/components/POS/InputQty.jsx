import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';

const InputQty = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);

	const handleChangeQty = (e) => {
		const value = Number(e.target.value);

		if (value < 1) {
			return console.log('tidak');
		}

		const form = [...products];
		form[index] = {
			...form[index],
			product_qty: value,
			product_subtotal: value * form[index].price,
		};

		dispatch(setForm({ key: 'products', value: form }));
	};
	return (
		<input
			value={[...products][index].product_qty}
			onChange={handleChangeQty}
			type="number"
			className="w-16 pl-2 pr-1 py-1 border border-gray-500 text-xs focus:outline-none focus:border-green_tea focus:ring-0 rounded transition"
		/>
	);
};

export default InputQty;
