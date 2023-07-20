import React from 'react';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import { useDispatch, useSelector } from 'react-redux';
import { preventCharactersOtherThanNumbers } from '../../helper/form';
import { formatThousand } from '../../helper/currency';
import FormInputTable from '../FormInputTabel';

const InputPrice = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);
	const { qty, qty_from_product_unit } = products[index];

	const onChange = (event) => {
		preventCharactersOtherThanNumbers(event);
		const price = event.target.value;
		const numbericPrice = Number(price);
		const newProducts = [...products];

		newProducts[index] = {
			...newProducts[index],
			price: numbericPrice,
			product_subtotal: numbericPrice * qty * qty_from_product_unit,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<FormInputTable.TextInput
			name={'price'}
			value={formatThousand(products[index].price)}
			onChange={onChange}
			className="w-20"
		/>
	);
};

export default InputPrice;
