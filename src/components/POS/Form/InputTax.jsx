import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../../redux/reducer/posSlice';
import FormInput from '../../FormInput';

const InputTax = () => {
	const dispatch = useDispatch();
	const { tax } = useSelector(getForm);

	const handleChange = (event) => {
		const value = Number(event.target.value);
		dispatch(setForm({ key: 'tax', value }));
	};
	return (
		<FormInput>
			<FormInput.Label title={'PPN (%)'} />
			<FormInput.InputSelect value={tax} onChange={handleChange}>
				<option value={0}>Tidak Dikenakan PPN</option>
				<option value={11}>11</option>
				<option value={12}>12</option>
				<option value={13}>13</option>
			</FormInput.InputSelect>
		</FormInput>
	);
};

export default InputTax;
