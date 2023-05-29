import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Pagination from '../Pagination';
import Table from '../Table';

const TableHead = () => {
	return (
		<Table.TH>
			<Table.THD textAlign="center">No</Table.THD>
			<Table.THD>Nama Pelanggan</Table.THD>
			<Table.THD>Kode Pelanggan</Table.THD>
			<Table.THD>Tanggal Lahir</Table.THD>
			<Table.THD>Email</Table.THD>
			<Table.THD>Nomor Hp.</Table.THD>
			<Table.THD>Alamat</Table.THD>
			<Table.THD>Status</Table.THD>
			<Table.THD>Aksi</Table.THD>
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
								<Table.TBD>Alika Nursavinna</Table.TBD>
								<Table.TBD>PL0192829291</Table.TBD>
								<Table.TBD>26 Mei 2023</Table.TBD>
								<Table.TBD>alika@gmial.com</Table.TBD>
								<Table.TBD>081292856047</Table.TBD>
								<Table.TBD>
									Jl. Jend Sudirman No. 30 Blok 3A Banjarmasin Selatan Kalimantan Selatan Indonesia
								</Table.TBD>
								<Table.TBD textAlign="center">
									<Table.StatusBadge status={'Aktif'} />
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
