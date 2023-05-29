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
					<Table.THD>Nama Gudang</Table.THD>
					<Table.THD>Nomor Telpon</Table.THD>
					<Table.THD>Alamat</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
								<Table.TBD>081272819282</Table.TBD>
								<Table.TBD>Jl. Antasari No. 82 Banjarmasin Tengah</Table.TBD>
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
