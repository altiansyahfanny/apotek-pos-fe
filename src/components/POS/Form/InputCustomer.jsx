import React from 'react';
import CompInputCustomer from '../../InputCustomer';
import { useSelector } from 'react-redux';
import { getForm, setForm } from '../../../redux/reducer/posSlice';

const InputCustomer = () => {
	const { customer_id } = useSelector(getForm);
	return <CompInputCustomer {...{ customer_id, setForm }} />;
};

export default InputCustomer;
