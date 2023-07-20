import React from 'react';
import CompInputDoctor from '../../InputDoctor';
import { useSelector } from 'react-redux';
import { getForm, setForm } from '../../../redux/reducer/posSlice';

const InputDoctor = () => {
	const { customer_id } = useSelector(getForm);
	return <CompInputDoctor {...{ customer_id, setForm }} />;
};

export default InputDoctor;
