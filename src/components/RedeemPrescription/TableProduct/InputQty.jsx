import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { preventCharactersOtherThanNumbers } from '../../../helper/form';
import FormInputTable from '../../FormInputTabel';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';

const InputQty = ({ index }) => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);
	const { qty_from_product_unit, qty, price } = product_prescriptions[index];

	const handleChangeQty = (e) => {
		preventCharactersOtherThanNumbers(e);
		const value = Number(e.target.value);

		const form = [...product_prescriptions];
		form[index] = {
			...form[index],
			qty: value,
			product_subtotal: value * qty_from_product_unit * price,
		};

		dispatch(setForm({ key: 'product_prescriptions', value: form }));
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
