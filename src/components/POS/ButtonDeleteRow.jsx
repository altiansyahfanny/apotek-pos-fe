import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';

const ButtonDeleteRow = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);
	const handleRemoveProduct = () => {
		const value = [...products];
		value.splice(index, 1);
		dispatch(setForm({ key: 'products', value }));
	};
	return (
		<button className="text-red-500 p-2" onClick={handleRemoveProduct}>
			<BsTrash />
		</button>
	);
};

export default ButtonDeleteRow;
