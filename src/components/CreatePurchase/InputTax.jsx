import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	calculateProductPrice,
	calculateQty,
	calculateSubtotal,
} from '../../helper/createPurchase';
import { getAddPurchaseFormState, setForm } from '../../redux/reducer/addPurchaseSlice';
import FormInput from '../FormInput';
import { getValidationError } from '../../helper/form';

const resetProductPrice = (products) => {
	const newProducts = products.map((product) => {
		const total_qty = calculateQty(product.qty, product.qty_from_product_unit);
		const product_price = calculateProductPrice(
			product.product_purchase_price,
			product.cashback,
			0
		);
		const subtotal = calculateSubtotal(total_qty, product_price);
		return {
			...product,
			product_price,
			subtotal,
		};
	});

	return newProducts;
};

const InputTax = () => {
	const error = getValidationError('tax');
	const [showPPN, setShowPPN] = useState(false);

	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);
	const products = [...form.products];

	const onChange = (event) => {
		const value = event.target.value;
		dispatch(setForm({ key: 'tax_category', value }));
		dispatch(setForm({ key: 'tax', value: '' }));

		if (value !== '') {
			// jika tidak kena ppn
			if (value == 1) {
				setShowPPN(false);
				const newProducts = resetProductPrice(products);
				dispatch(setForm({ key: 'products', value: newProducts }));
			}
			// jika sudah termasuk ppn
			else if (value == 3) {
				setShowPPN(true);
				const newProducts = resetProductPrice(products);
				dispatch(setForm({ key: 'products', value: newProducts }));
			}
			// jika belum termasuk ppn
			else {
				setShowPPN(true);
			}
		} else {
			setShowPPN(false);
			const newProducts = resetProductPrice(products);
			dispatch(setForm({ key: 'products', value: newProducts }));
		}
	};

	const onChangeTax = (e) => {
		const { value } = e.target;

		dispatch(setForm({ key: 'tax', value }));

		// jika belum termasuk pajak
		if (Number(form.tax_category) === 2) {
			if (products.length > 0) {
				const newProducts = products.map((product) => {
					const total_qty = calculateQty(product.qty, product.qty_from_product_unit);
					const product_price = calculateProductPrice(
						product.product_purchase_price,
						product.cashback,
						value,
						form.tax_category
					);
					const subtotal = calculateSubtotal(total_qty, product_price);
					return {
						...product,
						product_price,
						subtotal,
					};
				});
				dispatch(setForm({ key: 'products', value: newProducts }));
			}
		}
	};

	return (
		<div>
			<div className={`grid grid-cols-6 gap-x-1.5`}>
				<FormInput className={`${showPPN ? 'col-span-4' : 'col-span-6'}`}>
					<FormInput.Label title={'Pajak Pertambahan Nilai (PPN)'} required={true} />
					<FormInput.InputSelect value={form.tax_category} onChange={onChange} customError={error}>
						<FormInput.InputSelect.Option value={''}>Pilih Jenis PPN</FormInput.InputSelect.Option>
						<FormInput.InputSelect.Option value={1}>
							Tidak Dikenakan Pajak
						</FormInput.InputSelect.Option>
						<FormInput.InputSelect.Option value={2}>
							Belum termasuk Pajak
						</FormInput.InputSelect.Option>
						<FormInput.InputSelect.Option value={3}>
							Sudah Termasuk Pajak
						</FormInput.InputSelect.Option>
					</FormInput.InputSelect>
				</FormInput>
				{showPPN && (
					<FormInput className="col-span-2">
						<FormInput.Label title={'PPN (%)'} required={true} />
						<FormInput.InputSelect value={form.tax} onChange={onChangeTax} customError={error}>
							<FormInput.InputSelect.Option value={''}>PPN (%)</FormInput.InputSelect.Option>
							<FormInput.InputSelect.Option value={11}>11</FormInput.InputSelect.Option>
							<FormInput.InputSelect.Option value={12}>12</FormInput.InputSelect.Option>
							<FormInput.InputSelect.Option value={13}>13</FormInput.InputSelect.Option>
						</FormInput.InputSelect>
					</FormInput>
				)}
			</div>
		</div>
	);
};

export default InputTax;
