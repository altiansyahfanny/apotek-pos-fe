import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAddPurchaseFormState } from '../../redux/reducer/addPurchaseSlice';
import { formatToRupiah } from '../../helper/currency';

const TH = ({ title, textAlign = 'text-left', width = '' }) => (
	<th
		className={`px-2 py-2 font-semibold text-xs tracking-wide ${textAlign} ${width} whitespace-nowrap`}
	>
		{title}
	</th>
);

const TD = ({ children, textAlign = 'text-left', className = '' }) => (
	<td className={`px-2 py-2 ${textAlign} ${className}`}>{children}</td>
);

const TableTotal = () => {
	const form = useSelector(getAddPurchaseFormState);
	const [totalProductPrice, setTotalProductPrice] = useState(0);
	const [totalPPN, setTotalPPN] = useState(0);

	useEffect(() => {
		if ([...form.products].length > 0) {
			const total_product_price = [...form.products].reduce(
				(prev, product) => prev + Number(product.subtotal),
				0
			);

			// jika "Tidak Dikenakan Pajak"
			if (form.tax_category == 1) {
				setTotalPPN(0);
				setTotalProductPrice(total_product_price);
			}

			// jika "Belum Terkena Pajak"
			if (form.tax_category == 2) {
				const total_product_price_after_tax = [...form.products].reduce((prev, product) => {
					return (
						prev + Number(product.product_price) * (product.qty_from_product_unit * product.qty)
					);
				}, 0);
				const total_product_price_before_tax = [...form.products].reduce((prev, product) => {
					return (
						prev +
						(product.product_purchase_price - product.cashback) *
							(product.qty_from_product_unit * product.qty)
					);
				}, 0);

				setTotalPPN(Math.round(total_product_price_after_tax - total_product_price_before_tax));
				setTotalProductPrice(total_product_price_before_tax);
			}

			// jika "Sudah Termasuk Pajak"
			if (form.tax_category == 3) {
				const total_product_price = [...form.products].reduce((prev, product) => {
					return (
						prev + Number(product.product_price) * (product.qty_from_product_unit * product.qty)
					);
				}, 0);
				const total_product_purchase_price_without_tax =
					total_product_price * (100 / (Number(form.tax) + 100));

				// setTotalPPN(Math.round(total_product_price - total_product_purchase_price_without_tax));
				setTotalPPN(total_product_price - total_product_purchase_price_without_tax);
				setTotalProductPrice(Number(total_product_purchase_price_without_tax));
			}

			// jika "Belum Pilih Kategori Pajak"
			if (form.tax_category == '') {
				setTotalPPN(0);
				setTotalProductPrice(total_product_price);
			}
		} else {
			setTotalProductPrice(0);
			setTotalPPN(0);
		}
	}, [form, form.products]);

	return (
		<div>
			<table className="w-full text-xs text-gray-500 rounded-sm overflow-hidden">
				<thead className="bg-primary text-white">
					<tr className="">
						<TH textAlign="text-center" title={'Item Barang'} />
						<TH textAlign="text-center" title={'Total Harga'} />
						<TH textAlign="text-center" title={'PPN'} />
						<TH textAlign="text-center" title={'Cashback/Diskon'} />
						<TH textAlign="text-center" title={'Biaya Lainnya'} />
					</tr>
				</thead>
				<tbody>
					<tr className="bg-whitw border-b dark:bg-gray-800 dark:border-gray-700 items-start ">
						<TD textAlign="text-center">{form.products.length}</TD>
						<TD textAlign="text-center"> {formatToRupiah(totalProductPrice)}</TD>
						<TD textAlign="text-center"> {formatToRupiah(totalPPN)}</TD>
						<TD textAlign="text-center"> {formatToRupiah(form.cashback)}</TD>
						<TD textAlign="text-center"> {formatToRupiah(form.other_cost)}</TD>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableTotal;
