import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Pagination from '../Pagination';
import Table from '../Table';

const StatusBadge = () => {
	return (
		<span className="bg-green_tea text-white text-[0.6rem] px-2 py-0.5 rounded group-hover:bg-white group-hover:text-green_tea">
			Dijual
		</span>
	);
};

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>No. Ref. Penjualan</Table.THD>
					<Table.THD>Pelanggan</Table.THD>
					<Table.THD>Nama Produk</Table.THD>
					<Table.THD>Total</Table.THD>
					<Table.THD>Dibayar</Table.THD>
					<Table.THD>Piutang</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>03/02/2022 14:53</Table.TBD>
								<Table.TBD>INV2023040333</Table.TBD>
								<Table.TBD>Umum</Table.TBD>
								<Table.TBD>Antangin Jrg Original Sach SKU : ANTJRGORISAC 453524 </Table.TBD>
								<Table.TBD>3.300</Table.TBD>
								<Table.TBD>4.000</Table.TBD>
								<Table.TBD>0</Table.TBD>
								<Table.TBD>
									<StatusBadge />
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
