import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getValidationError } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const InputExpiredDate = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getAddPurchaseFormState);

	const error = getValidationError(`products[${index}].expired_date`);

	const onChange = (event) => {
		const newProducts = [...products];
		newProducts[index] = { ...newProducts[index], expired_date: event.target.value };
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<input
			value={products[index].expired_date}
			onChange={onChange}
			type="date"
			className={`${error ? 'form-input-table-error' : 'form-input-table'}`}
		/>
	);
};

export default InputExpiredDate;
