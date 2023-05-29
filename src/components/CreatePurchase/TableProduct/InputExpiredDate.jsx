import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getValidationError } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

function isDateLessThanOneYear(date) {
	// Mendapatkan tanggal saat ini
	const currentDate = new Date();

	// satu tahun dari sekarang
	const oneYearLater = new Date().setFullYear(currentDate.getFullYear() + 1);

	// Membandingkan tanggal yang diinput dengan tanggal satu tahun kemudian
	return date < oneYearLater;
}

const InputExpiredDate = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getAddPurchaseFormState);

	const error = getValidationError(`products[${index}].expired_date`);

	const onChange = (event) => {
		const value = event.target.value;

		if (isDateLessThanOneYear(new Date(value))) {
			alert('Tanggal kadaluarsa kurang dari satu tahum');
		}

		const newProducts = [...products];
		newProducts[index] = { ...newProducts[index], expired_date: value };
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<>
			<input
				value={products[index].expired_date}
				onChange={onChange}
				type="date"
				className={`${error ? 'form-input-table-error' : 'form-input-table'}`}
			/>
			{/* {lessThanOneYear && <span>Oke</span>} */}
		</>
	);
};

export default InputExpiredDate;
