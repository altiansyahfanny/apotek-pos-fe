import React from 'react';
import CompInputProduct from '../InputProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';

const InputProducts = () => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);

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

		const value = [...products];

		value.push({
			id: product.id,
			name: product.name,
			product_units: new_product_units,
			product_unit_id: new_product_units[0].id,
			product_stock_id: product.product_stocks[0].id,
			qty: 0,
			qty_from_product_unit: new_product_units[0].number_of_product_units,
			price: product.price,
			selling_price: product.price,
			product_subtotal: 0,
			alternative_prices: product.alternative_prices,
			product_stocks: product.product_stocks,

			price_type: 'Harga Utama',
			product_unit_type: new_product_units[0].name,
			product_stock_type: `${product.product_stocks[0].batch_number} (${product.product_stocks[0].qty})`,
			is_pending: false,
		});
		dispatch(setForm({ key: 'products', value }));
	};

	return (
		<div>
			<CompInputProduct onClick={onClick} />
		</div>
	);
};

export default InputProducts;
