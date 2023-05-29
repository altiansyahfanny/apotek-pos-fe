import React, { useEffect, useState } from 'react';
import { formatToRupiah } from '../../../helper/currency';
import { useDispatch, useSelector } from 'react-redux';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

const InputProductPrice = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getAddPurchaseFormState);
	const product = products[index];

	const [value, setValue] = useState(0);
	const [isFocused, setIsFocused] = useState(false);
	const [blink, setBlink] = useState(false);

	const handleInputChange = (event) => {
		preventCharactersOtherThanNumbers(event);
		const product_price = event.target.value;

		const newProducts = [...products];
		// setValue(product_price);

		if (product_price === '') {
			newProducts[index] = {
				...newProducts[index],
				subtotal: product.initital_subtotal,
				product_price,
			};
			dispatch(setForm({ key: 'products', value: newProducts }));
			return;
		}

		const numericProductPrice = Number(product_price);
		const newTotal =
			product.qty_from_product_unit * product.qty * numericProductPrice - product.cashback;

		newProducts[index] = {
			...newProducts[index],
			subtotal: newTotal,
			initital_subtotal: newTotal,
			product_price,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setBlink((prev) => !prev);
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="relative w-24">
			<div className={`px-2 border ${isFocused ? 'border-green_tea' : 'border-gray-500 '} rounded`}>
				<div className="py-1 whitespace-nowrap overflow-hidden flex items-center">
					<div>{formatToRupiah(product.product_price)}</div>
					{isFocused && blink && <div className="w-[0.05rem] h-4 bg-gray-500" />}
				</div>
			</div>
			<input
				value={product.product_price}
				onChange={handleInputChange}
				type="text"
				className="w-24 opacity-0 absolute top-0 bg-red-300 pl-2 pr-1 py-1 border border-white border-opacity-0 text-xs focus:outline-none"
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
};

export default InputProductPrice;
