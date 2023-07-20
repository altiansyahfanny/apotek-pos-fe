import moment from 'moment';
import React, { useState } from 'react';
import { IoMdOptions } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { formatToRupiah } from '../../helper/currency';
import { numberTabelWithPagination } from '../../helper/table';
import { toastError, toastSuccess } from '../../helper/toast';
import { useDeleteSaleMutation } from '../../redux/api/saleApi';
import {
	getSaleModalState,
	getSaleQueryState,
	setQuery,
	setModalDialog,
} from '../../redux/reducer/saleSlice';
import { badgeBackground, textColor } from '../../utils/color';
import ModalAlert from '../ModalAlert';
import Table from '../Table';

const StatusBadge = ({ sale }) => {
	let bg;
	let status;

	switch (sale.status) {
		case 2:
			status = 'Belum Lunas';
			bg = badgeBackground.warning;
			break;
		case 3:
			status = 'Pending';
			bg = badgeBackground.primary;
			break;
		case 4:
			status = 'Dihapus';
			bg = badgeBackground.danger;
			break;

		default:
			bg = badgeBackground.success;
			status = 'Lunas';
			break;
	}

	return <Table.StatusBadge bg={bg} status={status} />;
};

const TableContent = ({ data }) => {
	const dispatch = useDispatch();

	const [id, setId] = useState('');
	const { modal_alert_delete_is_open } = useSelector(getSaleModalState);
	const { current_page, limit } = useSelector(getSaleQueryState);

	const [deleteSale, responseDelete] = useDeleteSaleMutation();

	const onDelete = (id) => {
		dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: true }));
		setId(id);
	};

	const onDeleteConfirm = async () => {
		try {
			const response = await deleteSale(id).unwrap();
			toastSuccess(response.message);
			dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: false }));
		} catch (error) {
			toastError(error.data.message);
		}
	};

	const onCloseAlert = () => {
		dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: false }));
	};

	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Tanggal</Table.THD>
					<Table.THD>No. Ref. Penjualan</Table.THD>
					<Table.THD>Pelanggan</Table.THD>
					<Table.THD>Nama Produk</Table.THD>
					<Table.THD>Total</Table.THD>
					<Table.THD>Dibayar</Table.THD>
					<Table.THD>Piutang</Table.THD>
					<Table.THD textAlign="center">Status</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.data.map((sale, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>
								{moment(sale.date).format('DD/MM/YYYY HH:mm')}
							</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>{sale.reference_number}</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>{sale.customer.name}</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>
								{sale.product_sales.map((ps, index) => (
									<p key={index}>{`${ps.product.name} (${ps.qty} ${ps.product_unit.name})`}</p>
								))}
							</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>{formatToRupiah(sale.total)}</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>
								{formatToRupiah(sale.total_paid)}
							</Table.TBD>
							<Table.TBD lineThrough={sale.status === 4}>{formatToRupiah(sale.debt)}</Table.TBD>
							<Table.TBD textAlign="center">
								<StatusBadge {...{ sale }} />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction>
									<Table.ButtonAction.Option
										action={() => {}}
										icon={<IoMdOptions />}
										text={'Alasan Penghapusan'}
									/>
									<Table.ButtonAction.Option
										action={() => onDelete(sale.id)}
										icon={<IoMdOptions />}
										text={'Hapus'}
										color={textColor.danger}
									/>
								</Table.ButtonAction>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<Table.Pagination {...{ data, current_page, setQuery, limit }} />

			<ModalAlert
				title={'Yakin menghapus data?'}
				isOpen={modal_alert_delete_is_open}
				onClose={onCloseAlert}
			>
				<ModalAlert.Button onClick={onDeleteConfirm} disabled={responseDelete.isLoading}>
					Hapus
				</ModalAlert.Button>
				<ModalAlert.Button color="slate" onClick={onCloseAlert}>
					Batal
				</ModalAlert.Button>
			</ModalAlert>
		</div>
	);
};

export default TableContent;
