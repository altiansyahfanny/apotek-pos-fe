import React from 'react';
import { formatToRupiah } from '../../../helper/currency';
import Table from '../../Table';
import {
	getProductPurchaseQueryState,
	setQuery,
} from '../../../redux/reducer/productPurchaseSlice';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { numberTabelWithPagination } from '../../../helper/table';

const TableContent = ({ data }) => {
	const { limit, current_page } = useSelector(getProductPurchaseQueryState);
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nomor Faktur</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>Supplier</Table.THD>
					<Table.THD>Produk (Qty.)</Table.THD>
					<Table.THD>Nominal</Table.THD>
					<Table.THD>Terbayar</Table.THD>
					<Table.THD>Belum Bayar</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.data.map((purchase, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{purchase.invoice.invoice_number}</Table.TBD>
							<Table.TBD>{moment(purchase.invoice.date).format('DD/MM/YYYY HH:mm')}</Table.TBD>
							<Table.TBD>{purchase.invoice.supplier.name}</Table.TBD>
							<Table.TBD>{`${purchase.product.name} (${purchase.qty} ${purchase.product_unit.name})`}</Table.TBD>
							<Table.TBD>{formatToRupiah(purchase.total_amount)}</Table.TBD>
							<Table.TBD>(b)</Table.TBD>
							<Table.TBD>(b)</Table.TBD>
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
