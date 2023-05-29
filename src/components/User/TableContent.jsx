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
					<Table.THD>Nama</Table.THD>
					<Table.THD>Username</Table.THD>
					<Table.THD>Peran</Table.THD>
					<Table.THD>Gudang Utama</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>Altiansyh Fanny</Table.TBD>
								<Table.TBD>altiansyah_fanny</Table.TBD>
								<Table.TBD>Admin</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
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
