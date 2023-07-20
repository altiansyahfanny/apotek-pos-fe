import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInputTable from '../../FormInputTabel';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';

const InputProductUnit = ({ index }) => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);
	const { product_units, product_unit_type, qty, price } = product_prescriptions[index];

	const onClickOption = (product_unit) => {
		const newProducts = [...product_prescriptions];
		newProducts[index] = {
			...newProducts[index],
			qty_from_product_unit: product_unit.number_of_product_units,
			product_subtotal: product_unit.number_of_product_units * qty * price,
			product_unit_type: product_unit.name,
			product_unit_id: product_unit.id,
		};
		dispatch(setForm({ key: 'product_prescriptions', value: newProducts }));
	};

	return (
		<FormInputTable.InputSelect
			className={'w-28'}
			value={product_unit_type ?? 'Pilih Satuan'}
			index={index}
			name={'product_unit_id'}
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
