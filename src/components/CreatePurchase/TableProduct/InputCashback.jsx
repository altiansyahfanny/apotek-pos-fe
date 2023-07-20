import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	calculateCashback,
	calculateProductPrice,
	calculateQty,
	calculateSubtotal,
} from '../../../helper/createPurchase';
import { formatThousand } from '../../../helper/currency';
import { preventCharactersOtherThanNumbers } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const Switcher = ({ index }) => {
	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);
	const products = form.products;

	const setCashbackWithPersen = (value) => {
		const newProducts = [...products];
		const finalCashback = calculateCashback(
			Number(products[index].cashback),
			value,
			products[index].product_purchase_price
		);

		const total_qty = calculateQty(products[index].qty, products[index].qty_from_product_unit);
		const product_price = calculateProductPrice(
			products[index].product_purchase_price,
			finalCashback,
			form.tax,
			form.tax_category
		);
		const subtotal = calculateSubtotal(total_qty, product_price);

		newProducts[index] = {
			...newProducts[index],
			cashback_with_percen: value,
			product_price,
			subtotal,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<div className="flex items-center border rounded-sm text-xs  border-gray-500 divide-x divide-gray-500 overflow-hidden">
			<div
				className={`cursor-pointer py-1 w-6 grid place-content-center transition-all ${
					products[index].cashback_with_percen ? 'text-gray-700' : 'text-white bg-lime-500'
				} `}
				onClick={() => setCashbackWithPersen(false)}
			>
				Rp
			</div>
			<div
				className={`cursor-pointer py-1 w-6 grid place-content-center transition-all ${
					!products[index].cashback_with_percen ? 'text-gray-700' : 'text-white bg-lime-500'
				} `}
				onClick={() => setCashbackWithPersen(true)}
			>
				%
			</div>
		</div>
	);
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

		const finalCashback = calculateCashback(
			Number(cashback),
			product.cashback_with_percen,
			product.product_purchase_price
		);

		const total_qty = calculateQty(product.qty, product.qty_from_product_unit);
		const product_price = calculateProductPrice(
			product.product_purchase_price,
			finalCashback,
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
		<div className="flex items-center gap-1">
			<Switcher {...{ index }} />
			<input
				value={formatThousand(product.cashback)}
				onChange={onChange}
				type="text"
				className={`w-16 form-input-table`}
				onBlur={onBlur}
			/>
		</div>
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
