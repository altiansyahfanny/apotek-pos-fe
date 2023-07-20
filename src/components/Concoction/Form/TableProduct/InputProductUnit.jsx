import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInputTable from '../../../FormInputTabel';
import { getConcoctionFormState, setForm } from '../../../../redux/reducer/concoctionSlice';

const InputProductUnit = ({ index }) => {
	const dispatch = useDispatch();
	const { product_concoctions } = useSelector(getConcoctionFormState);
	const { product_units, product_unit_type } = product_concoctions[index];

	const onClickOption = (product_unit) => {
		const newProducts = [...product_concoctions];
		newProducts[index] = {
			...newProducts[index],
			qty_from_product_unit: product_unit.number_of_product_units,
			product_unit_type: product_unit.name,
			product_unit_id: product_unit.id,
		};
		dispatch(setForm({ key: 'product_concoctions', value: newProducts }));
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
