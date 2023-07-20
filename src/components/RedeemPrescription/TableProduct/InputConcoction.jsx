import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';
import CompInputConcoction from '../../InputConcoction';

const InputConcoction = () => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);

	const onClick = (concoction) => {
		// console.log('product_prescriptions : ', product_prescriptions);
		// return console.log('product_concoctions : ', concoction.product_concoctions);

		const value = [...product_prescriptions];

		const newValue = concoction.product_concoctions.map((product_concoction) => {
			const other_product_units = [...product_concoction.product.other_product_units];
			let new_product_units = [
				{
					...product_concoction.product.product_unit,
					number_of_other_product_units: 1,
					number_of_product_units: 1,
				},
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

			const curr_product_unit = new_product_units.find(
				(product_unit) => product_unit.id === product_concoction.product_unit_id
			);

			// return { curr_product_unit };

			return {
				id: product_concoction.product.id,
				name: product_concoction.product.name,
				product_units: new_product_units,
				product_unit_id: curr_product_unit.id,
				product_stock_id: product_concoction.product.product_stocks[0].id,
				qty: product_concoction.qty,
				qty_from_product_unit: curr_product_unit.number_of_product_units,
				price: product_concoction.product.price,
				selling_price: product_concoction.product.price,
				product_subtotal:
					curr_product_unit.number_of_product_units *
					product_concoction.qty *
					product_concoction.product.price,
				alternative_prices: product_concoction.product.alternative_prices,
				product_stocks: product_concoction.product.product_stocks,
				price_type: 'Harga Utama',
				product_unit_type: curr_product_unit.name,
				product_stock_type: `${product_concoction.product.product_stocks[0].batch_number} (${product_concoction.product.product_stocks[0].qty})`,
				is_pending: false,
			};
		});

		// return console.log('newValue : ', newValue);
		// console.log('value : ', value);

		value.push(...newValue);
		dispatch(setForm({ key: 'product_prescriptions', value }));
	};

	return (
		<div className="flex-1">
			<CompInputConcoction onClick={onClick} />
		</div>
	);
};

export default InputConcoction;
