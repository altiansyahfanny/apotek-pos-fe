import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Table from '../../Table';
import { formatToRupiah } from '../../../helper/currency';

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nomor Ref.</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>Pelanggan</Table.THD>
					<Table.THD>Produk</Table.THD>
					<Table.THD textAlign="right">Nominal (Rp.)</Table.THD>
					<Table.THD textAlign="right">Terbayar (Rp.)</Table.THD>
					<Table.THD textAlign="right">Belum Bayar (Rp.)</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>63908471</Table.TBD>
								<Table.TBD>13/05/2023 14:00</Table.TBD>
								<Table.TBD>Altiansyah Fanny</Table.TBD>
								<Table.TBD>Paracetamol Kimia Farma 500mg</Table.TBD>
								<Table.TBD textAlign="right">{formatToRupiah(30000)}</Table.TBD>
								<Table.TBD textAlign="right">{formatToRupiah(30000)}</Table.TBD>
								<Table.TBD textAlign="right">{formatToRupiah(0)}</Table.TBD>
								<Table.TBD textAlign="center">
									<Table.StatusBadge status="Lunas" />
								</Table.TBD>
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
