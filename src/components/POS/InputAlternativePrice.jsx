import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';
import FormInputTable from '../FormInputTabel';

const InputAlternativePrice = ({ index }) => {
	const dispatch = useDispatch();
	const { products } = useSelector(getForm);
	const { price_type, alternative_prices, qty, qty_from_product_unit, selling_price } =
		products[index];

	const onClickMainPrice = () => {
		const newProducts = [...products];
		newProducts[index] = {
			...newProducts[index],
			price: selling_price,
			product_subtotal: selling_price * qty * qty_from_product_unit,
			price_type: 'Harga Utama',
			is_custom_price: false,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	const onClickOption = (ap) => {
		const newProducts = [...products];
		newProducts[index] = {
			...newProducts[index],
			price: ap.price,
			product_subtotal: ap.price * qty * qty_from_product_unit,
			price_type: `Harga ${ap.alternative_price_category.name} (\u2264 ${ap.minimum_item} item)`,
			is_custom_price: false,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	const onClickCustomPrice = () => {
		const newProducts = [...products];
		newProducts[index] = {
			...newProducts[index],
			price_type: 'Atur Harga',
			is_custom_price: true,
		};
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<FormInputTable.InputSelect
			className={'w-[11rem]'}
			value={price_type ?? 'Pilih Jenis Harga'}
			index={index}
			name={'price_type'}
		>
			<FormInputTable.Option onClick={onClickMainPrice}>Harga Utama</FormInputTable.Option>
			{alternative_prices.map((ap, i) => (
				<FormInputTable.Option key={i} onClick={() => onClickOption(ap)}>
					Harga {ap.alternative_price_category.name} (&le; {ap.minimum_item} item)
				</FormInputTable.Option>
			))}
			<FormInputTable.Option onClick={onClickCustomPrice}>Atur Harga</FormInputTable.Option>
		</FormInputTable.InputSelect>
	);
};

export default InputAlternativePrice;

// return (
// 	<div>
// 		<InputSelect onChange={handleChange}>
// 			<option value={1}>Harga Utama</option>
// 			<option value={2}>Atur Harga</option>
// 			{alternative_prices.map((alternative_price, index) => (
// 				<option value={2}>
// 					{`Harga ${alternative_price.alternative_price_category.name} (`}&ge;
// 					{`${alternative_price.minimum_item} item )`}
// 				</option>
// 			))}
// 		</InputSelect>
// 	</div>
// );
