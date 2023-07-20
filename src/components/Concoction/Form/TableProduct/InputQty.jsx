import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { preventCharactersOtherThanNumbers } from '../../../../helper/form';
import FormInputTable from '../../../FormInputTabel';
import { getConcoctionFormState, setForm } from '../../../../redux/reducer/concoctionSlice';

const InputQty = ({ index }) => {
	const dispatch = useDispatch();
	const { product_concoctions } = useSelector(getConcoctionFormState);
	const { qty } = product_concoctions[index];

	const handleChangeQty = (e) => {
		preventCharactersOtherThanNumbers(e);
		const value = Number(e.target.value);

		const form = [...product_concoctions];
		form[index] = {
			...form[index],
			qty: value,
		};

		dispatch(setForm({ key: 'product_concoctions', value: form }));
	};
	return (
		<FormInputTable.TextInput
			value={qty}
			onChange={handleChangeQty}
			parentName={'product_concoctions'}
			name={'qty'}
			className={'w-16'}
		/>
	);
};

export default InputQty;
