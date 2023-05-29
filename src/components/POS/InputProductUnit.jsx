import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import InputSelect from './InputSelect';

const InputProductUnit = ({ product, index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);

	const handleChangeProductUnit = (e, product_units, index) => {
		const value = Number(e.target.value);

		const selected = product_units.find(
			(product_unit) => Number(product_unit.product_unit_id) === value
		);

		const form = [...products];
		form[index] = {
			...form[index],
			price: selected.price,
			product_subtotal: form[index].product_qty * selected.price,
		};

		dispatch(setForm({ key: 'products', value: form }));
	};
	return (
		<InputSelect onChange={(e) => handleChangeProductUnit(e, product.product_units, index)}>
			{product.product_units.map((product_unit, index) => (
				<option key={index} value={product_unit.product_unit_id}>
					{product_unit.product_unit_name}
				</option>
			))}
		</InputSelect>
	);
};

export default InputProductUnit;
