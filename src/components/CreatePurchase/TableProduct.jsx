import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { formatToRupiah } from '../../helper/currency';
import { getAddPurchaseFormState, setForm } from '../../redux/reducer/addPurchaseSlice';
import InputBatch from './TableProduct/InputBatch';
import InputCashback from './TableProduct/InputCashback';
import InputExpiredDate from './TableProduct/InputExpiredDate';
import InputProduct from './TableProduct/InputProduct';
import InputProductPurchasePrice from './TableProduct/InputProductPurchasePrice';
import InputProductUnit from './TableProduct/InputProductUnit';
import InputQty from './TableProduct/InputQty';
import PriceAnalysis from './TableProduct/PriceAnalysis';

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

const Button = ({ onClick }) => (
	<button className="p-1 text-red-500" onClick={onClick}>
		<BsTrash />
	</button>
);

const TableProduct = () => {
	const dispatch = useDispatch();
	const { products } = useSelector(getAddPurchaseFormState);

	const onDeleteRow = (index) => {
		const newProducts = [...products];
		newProducts.splice(index, 1);
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<>
			<div className="mb-4">
				<InputProduct />
			</div>
			<div className=" pb-4">
				<table className="w-full text-xs text-gray-500">
					<thead className="bg-primary text-white">
						<tr className="">
							<TH title={'No.'} textAlign="text-center" />
							<TH title={'Produk'} width="w-full" />
							<TH title={'No. Batch'} />
							<TH title={'Tanggal Kadaluarsa'} />
							<TH title={'Qty.'} />
							<TH title={'Satuan'} />
							<TH title={'Harga Beli'} />
							<TH title={'Diskon'} />
							<TH title={'Harga Pokok Produk'} />
							<TH title={'Analisa Harga Beli'} />
							<TH title={'Subtotal'} />
							<TH title={'Aksi'} textAlign="text-center" />
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => (
							<tr
								key={index}
								className="bg-whitw border-b dark:bg-gray-800 dark:border-gray-700 items-start "
							>
								<TD textAlign="text-center">{index + 1}</TD>
								<TD>{product.name}</TD>
								<TD>
									<InputBatch {...{ index }} />
								</TD>
								<TD>
									<InputExpiredDate {...{ index }} />
								</TD>
								<TD>
									<InputQty {...{ product, index }} />
								</TD>
								<TD>
									<InputProductUnit {...{ product, index }} />
								</TD>
								<TD>
									<InputProductPurchasePrice {...{ index }} />
								</TD>
								<TD>
									<InputCashback {...{ product, index }} />
								</TD>
								<TD>{formatToRupiah(product.product_price)}</TD>
								<TD className="whitespace-nowrap">
									<PriceAnalysis
										capital_price={product.capital_price}
										product_price={product.product_price}
									/>
								</TD>
								<TD className="whitespace-nowrap">{formatToRupiah(product.subtotal)}</TD>
								<TD textAlign="text-center">
									<Button onClick={() => onDeleteRow(index)} />
								</TD>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TableProduct;
