import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	calculateProductPrice,
	calculateQty,
	calculateSubtotal,
} from '../../../helper/createPurchase';
import { formatToRupiah } from '../../../helper/currency';
import { getValidationError } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

const InputProductPurchasePrice = ({ index }) => {
	const error = getValidationError(`products[${index}].product_purchase_price`);
	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);

	const products = form.products;
	const product = products[index];

	const onChange = (event) => {
		preventCharactersOtherThanNumbers(event);
		const product_purchase_price = event.target.value;
		const newProducts = [...products];

		const total_qty = calculateQty(product.qty, product.qty_from_product_unit);
		const product_price = calculateProductPrice(
			product_purchase_price,
			product.cashback,
			form.tax,
			form.tax_category
		);
		const subtotal = calculateSubtotal(total_qty, product_price);

		newProducts[index] = {
			...newProducts[index],
			subtotal,
			initital_subtotal: subtotal,
			product_purchase_price,
			product_price,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<input
			value={formatToRupiah(product.product_purchase_price)}
			onChange={onChange}
			type="text"
			className={`w-20 ${error ? 'form-input-table-error' : 'form-input-table'}`}
		/>
	);
};

export default InputProductPurchasePrice;
