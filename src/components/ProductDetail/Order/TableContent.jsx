import React from 'react';
import { formatToRupiah } from '../../../helper/currency';
import Table from '../../Table';

const TableContent = () => {
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nomor SP.</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>Supplier</Table.THD>
					<Table.THD>Produk (Qty.)</Table.THD>
					<Table.THD textAlign="right">Nominal (Rp.)</Table.THD>
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
								<Table.TBD>Paracetamol Kimia Farma 500mg (100)</Table.TBD>
								<Table.TBD textAlign="right">{formatToRupiah(30000)}</Table.TBD>
								<Table.TBD textAlign="center">
									<Table.StatusBadge status="Selesai" />
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
