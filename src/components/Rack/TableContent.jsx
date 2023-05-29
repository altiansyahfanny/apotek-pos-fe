import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Pagination from '../Pagination';
import Table from '../Table';

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nama Rak</Table.THD>
					<Table.THD>Gudang</Table.THD>
					<Table.THD>Deskripsi</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>Rak Baju</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
								<Table.TBD>Rak utama di gudang utama</Table.TBD>
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
