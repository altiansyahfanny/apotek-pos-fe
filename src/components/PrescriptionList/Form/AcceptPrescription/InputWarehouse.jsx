import React from 'react';
import CompInputWarehouse from '../../../InputWarehouse';
import { useSelector } from 'react-redux';
import { getPrescriptionFormState, setForm } from '../../../../redux/reducer/prescriptionSlice';

const InputWarehouse = () => {
	const { warehouse_id } = useSelector(getPrescriptionFormState);
	return <CompInputWarehouse {...{ warehouse_id, setForm }} />;
};

export default InputWarehouse;
