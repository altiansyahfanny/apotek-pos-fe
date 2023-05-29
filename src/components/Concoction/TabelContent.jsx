import React from 'react';
import Pagination from '../Pagination';
import Table from '../Table';
import { IoMdOptions } from 'react-icons/io';

const ButtonOpname = ({ status, bg = 'bg-green_tea', onClick }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`bg-blue-500 border border-transparent text-white text-[0.6rem] px-2 py-0.5 rounded group-hover:text-white group-hover:border-white `}
		>
			{status}
		</button>
	);
};

const TableHead = () => {
	return (
		<Table.TH>
			<Table.THD textAlign="center">No</Table.THD>
			<Table.THD>Nama Racikan</Table.THD>
			<Table.THD textAlign="center">Satuan</Table.THD>
			<Table.THD>Komposisi Obat</Table.THD>
			<Table.THD>Catatan</Table.THD>
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
								<Table.TBD>Obat oplosan terlarang</Table.TBD>
								<Table.TBD textAlign="center">Botol</Table.TBD>
								<Table.TBD>Antangin Jrg Original Sach (1 Sachet)</Table.TBD>
								<Table.TBD>Jangan di salah gunakan, dan diperjual belikan sembarangan</Table.TBD>
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
