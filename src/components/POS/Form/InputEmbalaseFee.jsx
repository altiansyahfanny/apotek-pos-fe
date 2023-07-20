import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatThousand } from '../../../helper/currency';
import { preventCharactersOtherThanNumbers } from '../../../helper/form';
import { getForm, setForm } from '../../../redux/reducer/posSlice';
import FormInput from './FormInput';

const InputEmbalaseFee = () => {
	const dispatch = useDispatch();
	const { products, service_fee, embalase_fee, shipping_costs, discount } = useSelector(getForm);

	const handleChange = (event) => {
		preventCharactersOtherThanNumbers(event);

		const value = Number(event.target.value);
		dispatch(setForm({ key: 'embalase_fee', value }));
	};
	return (
		<FormInput.TextInput
			label={'Biaya Embalase (Rp)'}
			value={formatThousand(embalase_fee)}
			onChange={handleChange}
			name={'service_fee'}
		/>
	);
};

export default InputEmbalaseFee;
