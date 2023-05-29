import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getValidationError } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const InputBatch = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getAddPurchaseFormState);

	const error = getValidationError(`products[${index}].batch_number`);

	const onChange = (event) => {
		const newProducts = [...products];
		newProducts[index] = { ...newProducts[index], batch_number: event.target.value };
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<input
			value={products[index].batch_number}
			onChange={onChange}
			type="text"
			className={`w-20 ${error ? 'form-input-table-error' : 'form-input-table'}`}
		/>
	);
};

export default InputBatch;
