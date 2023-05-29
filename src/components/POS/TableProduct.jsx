import React from 'react';
import { useSelector } from 'react-redux';
import { formatToRupiah } from '../../helper/currency';
import { getForm } from '../../redux/reducer/posSlice';
import ButtonDeleteRow from './ButtonDeleteRow';
import InputAlternativePrice from './InputAlternativePrice';
import InputBatch from './InputBatch';
import InputPrice from './InputPrice';
import InputProductUnit from './InputProductUnit';
import InputQty from './InputQty';

const TH = ({ title, textAlign = 'text-left', width = '' }) => (
	<th
		className={`px-2 py-2 font-semibold text-xs uppercase tracking-wide ${textAlign} ${width} whitespace-nowrap`}
	>
		{title}
	</th>
);

const TD = ({ children, textAlign = 'text-left' }) => (
	<td className={`px-2 py-2 ${textAlign}`}>{children}</td>
);

const TableProduct = () => {
	const { products, is_custom_price } = useSelector(getForm);

	return (
		<div>
			{products.length > 0 && (
				<table className="w-full text-xs text-gray-500 rounded overflow-hidden">
					<thead className="bg-secondary text-white">
						<tr className="">
							<TH title={'Product name'} width="w-full" />
							<TH title={'No. Batch'} />
							<TH title={'Qty'} />
							<TH title={'Satuan'} />
							<TH title={'Harga Alternatif'} />
							<TH title={'Harga Jual'} textAlign="text-right" />
							<TH title={'Subtotal'} textAlign="text-right" />
							<TH title={'Aksi'} textAlign="text-center" />
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => (
							<tr
								key={index}
								className="bg-whitw border-b dark:bg-gray-800 dark:border-gray-700 items-start "
							>
								<TD>{product.name}</TD>
								<TD>
									<InputBatch />
								</TD>
								<TD>
									<InputQty {...{ index }} />
								</TD>
								<TD>
									<InputProductUnit {...{ product, index }} />
								</TD>
								<TD>
									<InputAlternativePrice {...{ index }} />
								</TD>
								<TD textAlign="text-right">
									{is_custom_price ? <InputPrice {...{ index }} /> : formatToRupiah(product.price)}
								</TD>
								<TD textAlign="text-right">{formatToRupiah(product.product_subtotal)}</TD>
								<TD textAlign="text-center">
									<ButtonDeleteRow {...{ index }} />
								</TD>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TableProduct;
