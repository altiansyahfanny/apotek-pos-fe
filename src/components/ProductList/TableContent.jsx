import Tippy from '@tippyjs/react';
import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css'; // optional
import { formatToRupiah } from '../../helper/currency';
import Pagination from '../Pagination';
import Table from '../Table';

const TableContent = ({ data }) => {
	console.log('products : ', data);

	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nama Produk</Table.THD>
					<Table.THD textAlign="center">Kategori</Table.THD>
					<Table.THD textAlign="center">Stok</Table.THD>
					<Table.THD textAlign="center">Satuan</Table.THD>
					<Table.THD textAlign="right">Harga Beli</Table.THD>
					<Table.THD textAlign="right">Harga Jual</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.map((product, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">{index + 1}</Table.TBD>
							<Table.TBD>
								<Link to={'1/detail'}>{product.name}</Link>{' '}
							</Table.TBD>
							<Table.TBD textAlign="center">{product.product_category.name}</Table.TBD>
							<Table.TBD textAlign="center">{product.stock_amount}</Table.TBD>
							<Table.TBD textAlign="center">{product?.product_unit?.name ?? '-'}</Table.TBD>
							<Table.TBD textAlign="right">
								{formatToRupiah(product.selling_price ?? product.capital_price)}
							</Table.TBD>
							<Table.TBD textAlign="right">
								<div className="flex flex-col items-center gap-2 justify-end">
									<Tippy content="Harga Utama" disabled={false}>
										<span className="cursor-pointer">{formatToRupiah(product.price)}</span>
									</Tippy>
									{product.alternative_prices.map((alternative_prices, index) => (
										<Tippy
											content={alternative_prices.alternative_price_category.name}
											disabled={false}
										>
											<span className="cursor-pointer" key={index}>
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
								<div className="flex justify-center p-1 cursor-pointer">
									<IoMdOptions />
								</div>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<div className="mt-1">
				<Pagination />
			</div>
		</div>
	);
};

export default TableContent;
