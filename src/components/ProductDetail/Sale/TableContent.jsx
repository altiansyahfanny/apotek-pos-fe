import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Table from '../../Table';
import { formatToRupiah } from '../../../helper/currency';
import { numberTabelWithPagination } from '../../../helper/table';
import { useSelector } from 'react-redux';
import { getProductSaleQueryState, setQuery } from '../../../redux/reducer/productSaleSlice';
import moment from 'moment';

const TableContent = ({ data }) => {
	console.log('data ', data);

	const { limit, current_page } = useSelector(getProductSaleQueryState);

	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nomor Ref.</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>Pelanggan</Table.THD>
					<Table.THD>Produk</Table.THD>
					<Table.THD>Nominal</Table.THD>
					<Table.THD>Terbayar</Table.THD>
					<Table.THD>Belum Bayar</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.data.map((ps, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{ps.sale.reference_number}</Table.TBD>
							<Table.TBD>{moment(ps.sale.date).format('DD/MM/YYYY HH:mm')}</Table.TBD>
							<Table.TBD>{`${ps.sale.customer.name}`}</Table.TBD>
							<Table.TBD>{`${ps.product.name} (${ps.qty} ${ps.product_unit.name})`}</Table.TBD>
							<Table.TBD>{formatToRupiah(ps.total)}</Table.TBD>
							<Table.TBD>{`(b)`}</Table.TBD>
							<Table.TBD>{`(b)`}</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.StatusBadge status="Lunas (b)" />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<button>
									<Table.StatusBadge status="Rincian (b)" bg="bg-blue-500" />
								</button>
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
