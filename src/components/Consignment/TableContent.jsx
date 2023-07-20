import React from 'react';
import Pagination from '../Pagination';
import Table from '../Table';
import { IoMdOptions } from 'react-icons/io';

const StatusBadge = ({ status = 'Dijual', bg = 'bg-lime-500' }) => {
	return (
		<span
			className={`${bg} text-white text-[0.6rem] px-2 py-0.5 rounded group-hover:bg-white group-hover:text-lime-500`}
		>
			{status}
		</span>
	);
};

const TableHead = () => {
	return (
		<Table.TH>
			<Table.THD textAlign="center">No</Table.THD>
			<Table.THD>Tanggal</Table.THD>
			<Table.THD>No. Tanda Terima</Table.THD>
			<Table.THD>Konsinyor</Table.THD>
			<Table.THD>Produk</Table.THD>
			<Table.THD>Nilai Konsinyasi</Table.THD>
			<Table.THD>Setoran</Table.THD>
			<Table.THD textAlign="center">Status Pembayaran</Table.THD>
			<Table.THD textAlign="center">Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<TableHead />
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>11/12/2023</Table.TBD>
								<Table.TBD>12345678</Table.TBD>
								<Table.TBD>PT ABC</Table.TBD>
								<Table.TBD>Antangin Jrg Original Sach (1 Sachet)</Table.TBD>
								<Table.TBD>30.000.000</Table.TBD>
								<Table.TBD>30.000</Table.TBD>
								<Table.TBD textAlign="center">
									<StatusBadge status="Dibayar" />
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
