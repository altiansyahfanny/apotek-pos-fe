import React from 'react';
import { formatToRupiah } from '../../../helper/currency';
import Table from '../../Table';

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>Transaksi</Table.THD>
					<Table.THD>Batch</Table.THD>
					<Table.THD>Tanggal Kadaluarga</Table.THD>
					<Table.THD textAlign="right">Harga Beli (Rp.)</Table.THD>
					<Table.THD>Gudang</Table.THD>
					<Table.THD textAlign="center">Masuk</Table.THD>
					<Table.THD textAlign="center">Keluar</Table.THD>
					<Table.THD textAlign="center">Sisa</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>13/05/2023 14:00</Table.TBD>
								<Table.TBD>Mutasi Stok dari Pasar Lama Ke Pekapuran</Table.TBD>
								<Table.TBD>101</Table.TBD>
								<Table.TBD>13/05/2023</Table.TBD>
								<Table.TBD textAlign="right">{formatToRupiah(30000)}</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
								<Table.TBD textAlign="center">30</Table.TBD>
								<Table.TBD textAlign="center">0</Table.TBD>
								<Table.TBD textAlign="center">0</Table.TBD>
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
