import React from 'react';
import CompInputProduct from '../../InputProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getConcoctionFormState, setForm } from '../../../redux/reducer/concoctionSlice';

const InputProduct = () => {
	const dispatch = useDispatch();
	const { product_concoctions } = useSelector(getConcoctionFormState);

	const onClick = (product) => {
		const other_product_units = [...product.other_product_units];
		let new_product_units = [
			{ ...product.product_unit, number_of_other_product_units: 1, number_of_product_units: 1 },
		];

		if (other_product_units.length) {
			other_product_units.map((other_product_unit) =>
				new_product_units.push({
					id: other_product_unit.product_unit.id,
					name: other_product_unit.product_unit.name,
					number_of_other_product_units: other_product_unit.number_of_other_product_units,
					number_of_product_units: other_product_unit.number_of_product_units,
				})
			);
		}

		const value = [...product_concoctions];

		value.push({
			product_id: product.id,
			name: product.name,
			product_units: new_product_units,
			product_unit_id: new_product_units[0].id,
			qty: 0,
			qty_from_product_unit: new_product_units[0].number_of_product_units,
			product_unit_type: new_product_units[0].name,
			is_delete: false,
			is_edit: false,
		});

		dispatch(setForm({ key: 'product_concoctions', value }));
	};

	return (
		<div>
			<CompInputProduct onClick={onClick} />
		</div>
	);
};

export default InputProduct;
