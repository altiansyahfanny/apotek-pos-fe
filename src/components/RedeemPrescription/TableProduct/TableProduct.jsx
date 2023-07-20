import React from 'react';
import { useSelector } from 'react-redux';
import { getPrescriptionFormState } from '../../../redux/reducer/prescriptionSlice';
import InputBatch from './InputBatch';
import InputQty from './InputQty';
import InputProductUnit from './InputProductUnit';
import InputAlternativePrice from './InputAlternativePrice';
import InputPrice from './InputPrice';
import { formatToRupiah } from '../../../helper/currency';
import ButtonDeleteRow from './ButtonDeleteRow';
// import { formatToRupiah } from '../../helper/currency';
// import { getForm } from '../../redux/reducer/posSlice';
// import ButtonDeleteRow from './ButtonDeleteRow';
// import InputAlternativePrice from './InputAlternativePrice';
// import InputBatch from './InputBatch';
// import InputPrice from './InputPrice';
// import InputProductUnit from './InputProductUnit';
// import InputQty from './InputQty';

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
	const { product_prescriptions } = useSelector(getPrescriptionFormState);

	return (
		<div>
			{product_prescriptions && product_prescriptions.length > 0 && (
				<table className="w-full text-xs text-gray-500 border">
					<thead className="bg-primary text-white">
						<tr className="">
							<TH title={'Produk'} width="w-full" />
							<TH title={'No. Batch'} />
							<TH title={'Qty'} />
							<TH title={'Satuan'} />
							<TH title={'Harga Alternatif'} />
							<TH title={'Harga Jual'} />
							<TH title={'Subtotal'} />
							<TH title={'Aksi'} textAlign="text-center" />
						</tr>
					</thead>
					<tbody>
						{product_prescriptions.map((product, index) => (
							<tr
								key={index}
								className={`bg-white ${
									product_prescriptions.length - 1 !== index && 'border-b'
								} dark:bg-gray-800 dark:border-gray-700 items-start`}
							>
								<TD>{product.name}</TD>
								<TD>
									<InputBatch {...{ index }} />
								</TD>
								<TD>
									<InputQty {...{ index }} />
								</TD>
								<TD>
									<InputProductUnit {...{ index }} />
								</TD>
								<TD>
									<InputAlternativePrice {...{ index }} />
								</TD>
								<TD>
									{product.is_custom_price ? (
										<InputPrice {...{ index }} />
									) : (
										formatToRupiah(product.price)
									)}
								</TD>
								<TD>{formatToRupiah(product.product_subtotal)}</TD>
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
