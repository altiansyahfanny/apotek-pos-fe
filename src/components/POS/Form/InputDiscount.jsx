import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatThousand } from '../../../helper/currency';
import { preventCharactersOtherThanNumbers } from '../../../helper/form';
import { getForm, setForm } from '../../../redux/reducer/posSlice';
import FormInput from './FormInput';

const InputDiscount = () => {
	const dispatch = useDispatch();
	const { products, service_fee, embalase_fee, shipping_costs, discount } = useSelector(getForm);

	const handleChange = (event) => {
		preventCharactersOtherThanNumbers(event);

		const value = Number(event.target.value);
		dispatch(setForm({ key: 'discount', value }));
	};
	return (
		<FormInput.TextInput
			label={'Diskon (Rp)'}
			value={formatThousand(discount)}
			onChange={handleChange}
		/>
	);
};

export default InputDiscount;
