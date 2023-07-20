import React from 'react';
import { useSelector } from 'react-redux';
import { getPrescriptionFormState, setForm } from '../../../../redux/reducer/prescriptionSlice';
import CompInputDoctor from '../../../InputDoctor';

const InputDoctor = () => {
	const { doctor_id } = useSelector(getPrescriptionFormState);
	return <CompInputDoctor {...{ doctor_id, setForm }} />;
};

export default InputDoctor;
