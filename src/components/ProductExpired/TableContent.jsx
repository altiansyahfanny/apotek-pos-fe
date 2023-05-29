import React from 'react';
import Pagination from '../Pagination';
import Table from '../Table';

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
			<Table.THD>Produk</Table.THD>
			<Table.THD>Supplier</Table.THD>
			<Table.THD>Gudang</Table.THD>
			<Table.THD textAlign="center">Batch</Table.THD>
			<Table.THD>Tanggal Kadaluarsa</Table.THD>
			<Table.THD textAlign="center">Stok</Table.THD>
			<Table.THD>Satuan</Table.THD>
			<Table.THD>Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = () => {
	const handleClickOpname = () => {
		console.log('opname');
	};
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
								<Table.TBD>Antangin Jrg Original Sach SKU : ANTJRGORISAC 453524</Table.TBD>
								<Table.TBD>PT ABC</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
								<Table.TBD textAlign="center">20</Table.TBD>
								<Table.TBD>11/05/2023</Table.TBD>
								<Table.TBD textAlign="center">40</Table.TBD>
								<Table.TBD textAlign="center">Sachet</Table.TBD>
								<Table.TBD textAlign="center">
									<ButtonOpname
										status={'Opname (Belum)'}
										bg="bg-blue-500"
										onClick={handleClickOpname}
									/>
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
