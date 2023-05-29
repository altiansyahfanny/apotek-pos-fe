import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';
import { formatThousand } from '../../../helper/currency';
import {
	calculateProductPrice,
	calculateQty,
	calculateSubtotal,
} from '../../../helper/createPurchase';

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

const InputCashback = ({ product, index }) => {
	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);
	const products = form.products;

	const onChange = (event) => {
		preventCharactersOtherThanNumbers(event);
		const cashback = event.target.value;
		const newProducts = [...products];
		const numericCashback = Number(cashback);

		const total_qty = calculateQty(product.qty, product.qty_from_product_unit);
		const product_price = calculateProductPrice(
			product.product_purchase_price,
			numericCashback,
			form.tax,
			form.tax_category
		);
		const subtotal = calculateSubtotal(total_qty, product_price);

		newProducts[index] = {
			...newProducts[index],
			cashback: numericCashback,
			product_price,
			subtotal,
		};
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	const onBlur = (event) => {
		const cashback = event.target.value;
		const newProducts = [...products];
		if (cashback === '') {
			// Mengembalikan total ke nilai awal dari state
			newProducts[index] = {
				...newProducts[index],
				cashback: 0,
			};
			dispatch(setForm({ key: 'products', value: newProducts }));
			return;
		}
	};

	return (
		<input
			value={formatThousand(product.cashback)}
			onChange={onChange}
			type="text"
			className={`w-20 form-input-table`}
			onBlur={onBlur}
		/>
	);
};

export default InputCashback;

// const onChange = (event) => {
// 	preventCharactersOtherThanNumbers(event);
// 	const cashback = event.target.value;
// 	const newProducts = [...products];
// 	const numericCashback = Number(cashback);

// 	if (numericCashback > product.product_price * product.qty_from_product_unit * product.qty)
// 		return alert('Cashback tidak boleh lebih besar dari harga produk');

// 	if (cashback === '') {
// 		// Mengembalikan total ke nilai awal dari state
// 		newProducts[index] = {
// 			...newProducts[index],
// 			subtotal: product.initital_subtotal - 0,
// 			cashback: numericCashback,
// 		};
// 		dispatch(setForm({ key: 'products', value: newProducts }));
// 		return;
// 	}

// 	// const
// 	const newTotal = product.initital_subtotal * (product.product_price - numericCashback);

// 	newProducts[index] = {
// 		...newProducts[index],
// 		subtotal: newTotal,
// 		cashback: numericCashback,
// 	};

// 	dispatch(setForm({ key: 'products', value: newProducts }));
// };
