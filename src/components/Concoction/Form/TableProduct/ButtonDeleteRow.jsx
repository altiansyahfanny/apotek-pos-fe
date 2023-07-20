import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getConcoctionFormState, setForm } from '../../../../redux/reducer/concoctionSlice';

const ButtonDeleteRow = ({ index, product_concoction }) => {
	const dispatch = useDispatch();
	const { product_concoctions } = useSelector(getConcoctionFormState);

	const handleRemoveProduct = () => {
		const value = [...product_concoctions];

		if (product_concoction.is_edit) {
			value[index] = { ...value[index], is_delete: true };
		} else {
			value.splice(index, 1);
		}

		dispatch(setForm({ key: 'product_concoctions', value }));
	};
	return (
		<button className="text-red-500 p-2" onClick={handleRemoveProduct}>
			<BsTrash />
		</button>
	);
};

export default ButtonDeleteRow;
