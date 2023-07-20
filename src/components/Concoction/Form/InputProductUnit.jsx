import React from 'react';
import CompInputProductUnit from '../../InputProductUnit';
import { useSelector } from 'react-redux';
import { getConcoctionFormState, setForm } from '../../../redux/reducer/concoctionSlice';

const InputProductUnit = () => {
	const { product_unit_id } = useSelector(getConcoctionFormState);
	return <CompInputProductUnit {...{ product_unit_id, setForm }} />;
};

export default InputProductUnit;
