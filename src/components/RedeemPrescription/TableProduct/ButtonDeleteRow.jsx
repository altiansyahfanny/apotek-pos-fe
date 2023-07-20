import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';

const ButtonDeleteRow = ({ index }) => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);
	const handleRemoveProduct = () => {
		const value = [...product_prescriptions];
		value.splice(index, 1);
		dispatch(setForm({ key: 'product_prescriptions', value }));
	};
	return (
		<button className="text-red-500 p-2" onClick={handleRemoveProduct}>
			<BsTrash />
		</button>
	);
};

export default ButtonDeleteRow;
