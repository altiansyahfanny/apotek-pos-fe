import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInputTable from '../../FormInputTabel';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';

const InputAlternativePrice = ({ index }) => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);
	const { price_type, alternative_prices, qty, qty_from_product_unit, selling_price } =
		product_prescriptions[index];

	const onClickMainPrice = () => {
		const newProducts = [...product_prescriptions];
		newProducts[index] = {
			...newProducts[index],
			price: selling_price,
			product_subtotal: selling_price * qty * qty_from_product_unit,
			price_type: 'Harga Utama',
			is_custom_price: false,
		};

		dispatch(setForm({ key: 'product_prescriptions', value: newProducts }));
	};

	const onClickOption = (ap) => {
		const newProducts = [...product_prescriptions];
		newProducts[index] = {
			...newProducts[index],
			price: ap.price,
			product_subtotal: ap.price * qty * qty_from_product_unit,
			price_type: `Harga ${ap.alternative_price_category.name} (\u2264 ${ap.minimum_item} item)`,
			is_custom_price: false,
		};

		dispatch(setForm({ key: 'product_prescriptions', value: newProducts }));
	};

	const onClickCustomPrice = () => {
		const newProducts = [...product_prescriptions];
		newProducts[index] = {
			...newProducts[index],
			price_type: 'Atur Harga',
			is_custom_price: true,
		};
		dispatch(setForm({ key: 'product_prescriptions', value: newProducts }));
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
