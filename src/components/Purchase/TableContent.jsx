import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Pagination from '../Pagination';
import Table from '../Table';
import { formatToRupiah } from '../../helper/currency';
import moment from 'moment';
import { dateFormatWithTime } from '../../helper/dateFormater';

const TableContent = ({ data }) => {
	console.log('invoices : ', data);

	const time = moment.utc('2023-05-25T17:00:00.000Z').format('YYYY/MM/DD HH:mm:ss');
	console.log(time); // Output: 2023/05/25 17:00:00

	// const currentDate =;

	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>No. Faktur</Table.THD>
					<Table.THD>Supplier</Table.THD>
					<Table.THD>Nama Produk</Table.THD>
					<Table.THD>Total</Table.THD>
					<Table.THD>Dibayar</Table.THD>
					<Table.THD>Saldo</Table.THD>
					<Table.THD textAlign="center">Status Barang</Table.THD>
					<Table.THD textAlign="center">Status </Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.map((invoice, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">{index + 1}</Table.TBD>
							<Table.TBD>{dateFormatWithTime(invoice.date)}</Table.TBD>
							<Table.TBD>{invoice.invoice_number}</Table.TBD>
							<Table.TBD>{invoice.supplier.name}</Table.TBD>
							<Table.TBD>
								{invoice.purchases.map((purchase, index) => (
									<p
										key={index}
									>{`${purchase.product.name} (${purchase.qty} ${purchase.product_unit.name})`}</p>
								))}
							</Table.TBD>
							<Table.TBD>{formatToRupiah(invoice.total_amount)}</Table.TBD>
							<Table.TBD>0</Table.TBD>
							<Table.TBD>{formatToRupiah(invoice.total_amount)}</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.StatusBadge status="Diterima" />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.StatusBadge status="Belum Lunas" bg="bg-red-500" />
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
		</div>
	);
};

export default TableContent;
