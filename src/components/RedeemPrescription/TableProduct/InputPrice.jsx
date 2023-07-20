import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { preventCharactersOtherThanNumbers } from '../../../helper/form';
import { formatThousand } from '../../../helper/currency';
import FormInputTable from '../../FormInputTabel';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';

const InputPrice = ({ index }) => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);
	const { qty, qty_from_product_unit } = product_prescriptions[index];

	const onChange = (event) => {
		preventCharactersOtherThanNumbers(event);
		const price = event.target.value;
		const numbericPrice = Number(price);
		const newProducts = [...product_prescriptions];

		newProducts[index] = {
			...newProducts[index],
			price: numbericPrice,
			product_subtotal: numbericPrice * qty * qty_from_product_unit,
		};

		dispatch(setForm({ key: 'product_prescriptions', value: newProducts }));
	};

	return (
		<FormInputTable.TextInput
			name={'price'}
			value={formatThousand(product_prescriptions[index].price)}
			onChange={onChange}
			className="w-20"
		/>
	);
};

export default InputPrice;
