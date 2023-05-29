import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Pagination from '../Pagination';
import Table from '../Table';

const StatusBadge = ({ status }) => {
	return (
		<span className="bg-green_tea text-white text-[0.6rem] px-2 py-0.5 rounded group-hover:bg-white group-hover:text-green_tea">
			{status}
		</span>
	);
};

const ButtonDetail = ({ children, onClick }) => {
	return (
		<div className="cursor-pointer" onClick={onClick}>
			{children}
		</div>
	);
};

const TableHead = () => {
	return (
		<Table.TH>
			<Table.THD textAlign="center">No</Table.THD>
			<Table.THD>Tanggal</Table.THD>
			<Table.THD>Kode Resep</Table.THD>
			<Table.THD>Dokter</Table.THD>
			<Table.THD>Pelanggan</Table.THD>
			<Table.THD>Isi Resep</Table.THD>
			<Table.THD>Harga Resep</Table.THD>
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
								<Table.TBD>11/05/2023 21:52</Table.TBD>
								<Table.TBD>RES2023051110013</Table.TBD>
								<Table.TBD>Alika Nursavinna</Table.TBD>
								<Table.TBD>Altiansyah Fanny</Table.TBD>
								<Table.TBD textAlign="center">
									<ButtonDetail onClick={() => {}}>
										<StatusBadge status={'detail'} />
									</ButtonDetail>
								</Table.TBD>
								<Table.TBD textAlign="center">4.000</Table.TBD>
								<Table.TBD textAlign="center">
									<StatusBadge status={'Dijual'} />
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
