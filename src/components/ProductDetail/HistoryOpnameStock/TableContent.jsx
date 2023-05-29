import React from 'react';
import { formatToRupiah } from '../../../helper/currency';
import Table from '../../Table';

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Produk</Table.THD>
					<Table.THD>Gudang</Table.THD>
					<Table.THD>Batch</Table.THD>
					<Table.THD textAlign="center">Stok</Table.THD>
					<Table.THD>Keterangan</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>Paracetamol Kimia Farma 500mg (30)</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
								<Table.TBD textAlign="center">30</Table.TBD>
								<Table.TBD textAlign="center">50</Table.TBD>
								<Table.TBD>Terakhir Stok Opname 17/08/2022 21.23</Table.TBD>
								<Table.TBD textAlign="center">
									<button>
										<Table.StatusBadge status="Rincian" bg="bg-blue-500" />
									</button>
								</Table.TBD>
							</Table.TBR>
						))}
				</Table.TB>
			</Table>
		</div>
	);
};

export default TableContent;
