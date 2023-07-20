import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { preventCharactersOtherThanNumbers } from '../../helper/form';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import FormInputTable from '../FormInputTabel';

const InputQty = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);
	const { qty_from_product_unit, qty, price } = products[index];

	const handleChangeQty = (e) => {
		preventCharactersOtherThanNumbers(e);
		const value = Number(e.target.value);

		const form = [...products];
		form[index] = {
			...form[index],
			qty: value,
			product_subtotal: value * qty_from_product_unit * price,
		};

		dispatch(setForm({ key: 'products', value: form }));
	};
	return (
		<FormInputTable.TextInput
			value={qty}
			onChange={handleChangeQty}
			name={'qty'}
			className={'w-16'}
		/>
	);
};

export default InputQty;
