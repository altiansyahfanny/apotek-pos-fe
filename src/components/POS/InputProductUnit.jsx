import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import FormInputTable from '../FormInputTabel';

const InputProductUnit = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);
	const { product_units, product_unit_type, qty, price } = products[index];

	const onClickOption = (product_unit) => {
		const newProducts = [...products];
		newProducts[index] = {
			...newProducts[index],
			qty_from_product_unit: product_unit.number_of_product_units,
			product_subtotal: product_unit.number_of_product_units * qty * price,
			product_unit_type: product_unit.name,
			product_unit_id: product_unit.id,
		};
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<FormInputTable.InputSelect
			className={'w-28'}
			value={product_unit_type ?? 'Pilih Satuan'}
			index={index}
			name={'qty'}
		>
			{product_units.map((product_unit, index) => (
				<FormInputTable.Option key={index} onClick={() => onClickOption(product_unit)}>
					{`${product_unit.name} (${product_unit.number_of_product_units})`}
				</FormInputTable.Option>
			))}
		</FormInputTable.InputSelect>
	);
};

export default InputProductUnit;
