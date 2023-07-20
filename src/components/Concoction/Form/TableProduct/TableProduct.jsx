import React from 'react';
import { getConcoctionFormState } from '../../../../redux/reducer/concoctionSlice';
import { useSelector } from 'react-redux';
import InputQty from './InputQty';
import InputProductUnit from './InputProductUnit';
import ButtonDeleteRow from './ButtonDeleteRow';

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
	const { product_concoctions } = useSelector(getConcoctionFormState);

	return (
		<div>
			{/* {products.length > 0 && ( */}
			<table className="w-full text-xs text-gray-500 border">
				<thead className="bg-primary text-white">
					<tr className="">
						<TH title={'No'} />
						<TH title={'Nama Produk'} width="w-full" />
						<TH title={'Qty'} />
						<TH title={'Satuan'} />
						<TH title={'Aksi'} textAlign="text-center" />
					</tr>
				</thead>
				<tbody>
					{product_concoctions.map((product, index) => {
						if (!product.is_delete) {
							return (
								<tr
									key={index}
									className={`bg-white ${
										product_concoctions.length - 1 !== index && 'border-b'
									} dark:bg-gray-800 dark:border-gray-700 items-start`}
								>
									<TD>{index + 1}</TD>
									<TD>{product.name}</TD>
									<TD>
										<InputQty {...{ index }} />
									</TD>
									<TD>
										<InputProductUnit {...{ index }} />
									</TD>

									<TD textAlign="text-center">
										<ButtonDeleteRow {...{ index, product_concoction: product }} />
									</TD>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
			{/* )} */}
		</div>
	);
};

export default TableProduct;
