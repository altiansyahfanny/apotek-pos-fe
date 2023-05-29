import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	calculateProductPrice,
	calculateQty,
	calculateSubtotal,
} from '../../../helper/createPurchase';
import { getValidationError } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

const InputQty = ({ product, index }) => {
	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);
	const products = form.products;

	const error = getValidationError(`products[${index}].qty`);

	const onChange = (event) => {
		preventCharactersOtherThanNumbers(event);
		const qty = event.target.value;
		const newProducts = [...products];
		const numericQty = Number(qty);

		const total_qty = calculateQty(numericQty, product.qty_from_product_unit);
		const product_price = calculateProductPrice(
			product.product_purchase_price,
			product.cashback,
			form.tax,
			form.tax_category
		);
		const subtotal = calculateSubtotal(total_qty, product_price);

		newProducts[index] = {
			...newProducts[index],
			qty: numericQty,
			subtotal: subtotal,
		};
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<input
			value={product.qty}
			onChange={onChange}
			type="text"
			className={`w-16 ${error ? 'form-input-table-error' : 'form-input-table'}`}
		/>
	);
};

export default InputQty;
