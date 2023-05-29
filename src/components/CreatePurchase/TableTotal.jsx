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
	const [totalProductCashback, setTotalProductCashback] = useState(0);

	useEffect(() => {
		if ([...form.products].length > 0) {
			const total_product_cashback = [...form.products].reduce((prev, product) => {
				const cashback = product.cashback * (product.qty_from_product_unit * product.qty);
				return prev + cashback;
			}, 0);
			const total_product_price = [...form.products].reduce(
				(prev, product) =>
					prev + product.product_purchase_price * (product.qty_from_product_unit * product.qty),
				0
			);

			// jika selain sudah termasuk pajak
			if (form.tax_category != 3) {
				setTotalProductPrice(total_product_price);
				setTotalPPN(Math.round(((total_product_price - total_product_cashback) * form.tax) / 100));
			}
			// jika sudah terkena pajak
			else {
				const total_capital_price = [...form.products].reduce((prev, product) => {
					return prev + product.capital_price * (product.qty_from_product_unit * product.qty);
				}, 0);

				const total_capital_price_without__ppn =
					total_capital_price * (100 / (Number(form.tax) + 100));
				setTotalProductPrice(Math.round(total_capital_price_without__ppn));
				setTotalPPN(Math.round(total_capital_price - total_capital_price_without__ppn));
			}
			setTotalProductCashback(total_product_cashback);
		} else {
			setTotalProductPrice(0);
			setTotalPPN(0);
			setTotalProductCashback(0);
		}
	}, [form, form.products]);

	return (
		<div>
			<table className="w-full text-xs text-gray-500 rounded-sm overflow-hidden">
				<thead className="bg-secondary text-white">
					<tr className="">
						<TH textAlign="text-center" title={'Item Barang'} />
						<TH textAlign="text-center" title={'Total Harga'} />
						<TH textAlign="text-center" title={'PPN'} />
						<TH textAlign="text-center" title={'Diskon/Cashback'} />
						<TH textAlign="text-center" title={'Biaya Lainnya'} />
					</tr>
				</thead>
				<tbody>
					<tr className="bg-whitw border-b dark:bg-gray-800 dark:border-gray-700 items-start ">
						<TD textAlign="text-center">{form.products.length}</TD>
						<TD textAlign="text-center">Rp. {formatToRupiah(totalProductPrice)}</TD>
						<TD textAlign="text-center">Rp. {formatToRupiah(totalPPN)}</TD>
						<TD textAlign="text-center">
							Rp. {formatToRupiah(totalProductCashback + form.cashback)}
						</TD>
						<TD textAlign="text-center">Rp. {formatToRupiah(form.other_cost)}</TD>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableTotal;
