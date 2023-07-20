import Tippy from '@tippyjs/react';
import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css'; // optional
import { formatThousand, formatToRupiah } from '../../helper/currency';
import { getProductQueryState, setQuery } from '../../redux/reducer/productSlice';
import Table from '../Table';
import { numberTabelWithPagination } from '../../helper/table';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { setAllForm } from '../../redux/reducer/addProductSlice';
import { tranformFormForEdit } from '../../helper/createProduct';

const TableContent = ({ data }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { limit, current_page } = useSelector(getProductQueryState);

	const onClickEdit = (product) => {
		// console.log('product : ', product);
		const newProduct = tranformFormForEdit(product);
		console.log('product : ', newProduct);

		dispatch(setAllForm(newProduct));
		navigate('create');
	};
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nama Produk</Table.THD>
					<Table.THD textAlign="center">Kategori</Table.THD>
					<Table.THD textAlign="center">Stok</Table.THD>
					<Table.THD textAlign="center">Satuan</Table.THD>
					<Table.THD textAlign="">Harga Beli</Table.THD>
					<Table.THD textAlign="">Harga Jual</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.data.map((product, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>
								<Link to={`${product.id}/detail`}>{product.name}</Link>{' '}
							</Table.TBD>
							<Table.TBD textAlign="center">{product.product_category.name}</Table.TBD>
							<Table.TBD textAlign="center">{formatThousand(product.stock_amount)}</Table.TBD>
							<Table.TBD textAlign="center">{product?.product_unit?.name ?? '-'}</Table.TBD>
							<Table.TBD textAlign="">
								{formatToRupiah(product.selling_price ?? product.capital_price)}
							</Table.TBD>
							<Table.TBD textAlign="right">
								<div className="flex flex-col items-start">
									<Tippy content="Harga Utama" disabled={false} className="text-center">
										<span className="cursor-pointer text-right">
											{formatToRupiah(product.price)}
										</span>
									</Tippy>
									{product.alternative_prices.map((alternative_prices, index) => (
										<Tippy
											key={index}
											content={`${alternative_prices.alternative_price_category.name} \u2265 ${alternative_prices.minimum_item} item`}
											disabled={false}
										>
											<span className="cursor-pointer text-right">
												{formatToRupiah(alternative_prices.price)}
											</span>
										</Tippy>
									))}
								</div>
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.StatusBadge
									status={product.product_status.name}
									bg={product.product_status_id === 1 ? 'bg-green-500' : 'bg-red-500'}
								/>
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction labelIcon={<IoMdOptions />}>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Edit'}
										action={() => onClickEdit(product)}
									/>
								</Table.ButtonAction>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<Table.Pagination {...{ data, current_page, setQuery, limit }} />
		</div>
	);
};

export default TableContent;
