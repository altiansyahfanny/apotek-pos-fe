import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddProductFormState, setForm } from '../../redux/reducer/addProductSlice';
import FormInput from '../FormInput';
import { preventCharactersOtherThanNumbers } from '../../helper/form';
import { formatToRupiah } from '../../helper/currency';

const InputPrice = React.forwardRef(() => {
	const dispatch = useDispatch();
	const { count_price_with_margin, price, profit_margin, capital_price } =
		useSelector(getAddProductFormState);

	const marginRef = useRef();
	const priceRef = useRef();

	useEffect(() => {
		if (count_price_with_margin) {
			marginRef.current.disabledChildElement(false);
			marginRef.current.focusChildElement();

			priceRef.current.disabledChildElement(true);
			priceRef.current.blurChildElement();
		} else {
			marginRef.current.disabledChildElement(true);
			marginRef.current.blurChildElement();

			priceRef.current.disabledChildElement(false);
			priceRef.current.focusChildElement();
		}
	}, [count_price_with_margin]);

	const handleChangeCountWithMargin = (e) => {
		dispatch(setForm({ key: 'count_price_with_margin', value: !count_price_with_margin }));
	};

	const handleChangePersentaseProfitMargin = (event) => {
		preventCharactersOtherThanNumbers(event);
		const value = event.target.value;
		const numericValue = Number(value);
		const price = (capital_price * numericValue) / 100 + capital_price;

		dispatch(setForm({ key: 'profit_margin', value: numericValue }));
		dispatch(setForm({ key: 'price', value: price }));
	};

	const handleChangeProductPrice = (event) => {
		preventCharactersOtherThanNumbers(event);
		const value = event.target.value;
		const numericValue = Number(value);
		const profit_margin = ((numericValue - capital_price) / capital_price) * 100;

		dispatch(setForm({ key: 'profit_margin', value: profit_margin }));
		dispatch(setForm({ key: 'price', value: numericValue }));
	};

	const handleChangeCapitalPrice = (event) => {
		preventCharactersOtherThanNumbers(event);
		const value = event.target.value;
		const numericValue = Number(value);
		const price = (numericValue * Number(profit_margin)) / 100 + numericValue;

		dispatch(setForm({ key: 'price', value: Number(price) }));
		dispatch(setForm({ key: 'capital_price', value: numericValue }));
	};
	return (
		<>
			<FormInput>
				<FormInput.Label title={'Harga Produk/Modal (per Satuan)'} required={true} />
				<FormInput.TextInput
					type={'text'}
					name={'capital_price'}
					value={formatToRupiah(capital_price)}
					onChange={handleChangeCapitalPrice}
					note={'(hanya untuk mempermudah penentuan harga jual)'}
				/>
			</FormInput>

			<input
				type="checkbox"
				name="count_price_with_margin"
				onChange={handleChangeCountWithMargin}
				checked={count_price_with_margin}
				className="form-checkbox text-green_tea rounded border-gray-300 focus:ring-green_tea"
			/>

			<FormInput>
				<FormInput.Label title={'Margin/Keuntungan (%)'} required={true} />
				<FormInput.TextInput
					ref={marginRef}
					value={formatToRupiah(profit_margin)}
					type={'text'}
					onChange={handleChangePersentaseProfitMargin}
				/>
			</FormInput>

			<FormInput>
				<FormInput.Label title={'Harga Jual'} required={true} />
				<FormInput.TextInput
					ref={priceRef}
					value={formatToRupiah(price)}
					type={'text'}
					name={'price'}
					onChange={handleChangeProductPrice}
				/>
			</FormInput>
		</>
	);
});

export default InputPrice;
