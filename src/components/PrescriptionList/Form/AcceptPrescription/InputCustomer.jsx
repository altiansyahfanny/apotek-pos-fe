import React from 'react';
import { useSelector } from 'react-redux';
import { getPrescriptionFormState, setForm } from '../../../../redux/reducer/prescriptionSlice';
import CompInputCustomer from '../../../InputCustomer';

const InputCustomer = () => {
	const { customer_id } = useSelector(getPrescriptionFormState);
	return <CompInputCustomer {...{ customer_id, setForm }} />;
};

export default InputCustomer;
