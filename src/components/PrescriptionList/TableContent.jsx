import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IoMdOptions } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatToRupiah } from '../../helper/currency';
import {
	getPrescriptionModalState,
	getPrescriptionQueryState,
	setAllForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/prescriptionSlice';
import { badgeBackground } from '../../utils/color';
import Modal from '../Modal';
import Table from '../Table';
import ModalAlert from '../ModalAlert';
import { useDeletePrescriptionMutation } from '../../redux/api/prescriptionApi';
import { toastError, toastSuccess } from '../../helper/toast';
import { numberTabelWithPagination } from '../../helper/table';

const StatusBadge = ({ prescription }) => {
	// 1 = lunas, 2 = dibayar sebagian, 3 = belum ditebus, 4 = deleted

	let bg;
	let status;

	switch (prescription.status) {
		case 2:
			status = 'Dibayar Sebagian';
			bg = badgeBackground.primary;
			break;
		case 3:
			status = 'Belum Ditebus';
			bg = badgeBackground.warning;
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

const TableHead = () => {
	return (
		<Table.TH>
			<Table.THD textAlign="center">No</Table.THD>
			<Table.THD>Tanggal</Table.THD>
			<Table.THD>Kode Resep</Table.THD>
			<Table.THD>Dokter</Table.THD>
			<Table.THD>Pelanggan</Table.THD>
			<Table.THD textAlign="center">Isi Resep</Table.THD>
			<Table.THD>Harga Resep</Table.THD>
			<Table.THD textAlign="center">Status</Table.THD>
			<Table.THD textAlign="center">Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = ({ data }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { limit, current_page } = useSelector(getPrescriptionQueryState);
	const { modal_detail_is_open, modal_alert_delete_is_open } =
		useSelector(getPrescriptionModalState);

	const [prescriptionDetails, setPrescriptionDetails] = useState([]);
	const [id, setId] = useState(null);

	const [deletePrescription, responseDelete] = useDeletePrescriptionMutation();

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_detail_is_open', value: false }));
	};

	const openModal = (prescription_details) => {
		dispatch(setModalDialog({ key: 'modal_detail_is_open', value: true }));
		setPrescriptionDetails(prescription_details);
	};

	const onClickReedem = (prescription) => {
		navigate(`redeem/${prescription.id}`);
		dispatch(
			setAllForm({ ...prescription, date: moment(prescription.date).format('YYYY-MM-DDTHH:mm') })
		);
	};

	const onClickEdit = (prescription) => {
		dispatch(setModalDialog({ key: 'modal_accept_is_open', value: true }));
		dispatch(
			setAllForm({
				...prescription,
				date: moment(prescription.date).format('YYYY-MM-DDTHH:mm'),
				is_edit: true,
				prescription_details: prescription.prescription_details.map((prescription_detail) => ({
					...prescription_detail,
					is_edit: true,
				})),
			})
		);
	};

	const onClickDelete = (id) => {
		setId(id);
		dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: true }));
	};

	const onCloseAlert = () => {
		dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: false }));
	};

	const onDeleteConfirm = async () => {
		try {
			const response = await deletePrescription(id).unwrap();
			toastSuccess(response.message);
			dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: false }));
		} catch (error) {
			toastError(error.data.message);
		}
	};

	return (
		<div className="mt-2">
			<Table>
				<TableHead />
				<Table.TB>
					{data.data.map((prescription, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{moment(prescription.date).format('DD/MM/YYYY HH:mm')}</Table.TBD>
							<Table.TBD>{prescription.code}</Table.TBD>
							<Table.TBD>{prescription.doctor.name}</Table.TBD>
							<Table.TBD>{prescription.customer.name}</Table.TBD>
							<Table.TBD textAlign="center">
								<button onClick={() => openModal(prescription.prescription_details)}>
									<Table.StatusBadge status="Detail" />
								</button>
							</Table.TBD>
							<Table.TBD>{formatToRupiah(0)}</Table.TBD>
							<Table.TBD textAlign="center">
								<StatusBadge {...{ prescription }} />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction labelIcon={<IoMdOptions />}>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Tebus'}
										action={() => onClickReedem(prescription)}
									/>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Edit'}
										action={() => onClickEdit(prescription)}
									/>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										color="text-red-500"
										text={'Hapus'}
										action={() => onClickDelete(prescription.id)}
									/>
								</Table.ButtonAction>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<Table.Pagination {...{ data, current_page, setQuery, limit }} />

			<Modal isOpen={modal_detail_is_open} closeModal={closeModal} title={'Detail Resep'}>
				<div className="flex flex-col gap-2">
					{prescriptionDetails.map((prescriprion_detail, index) => (
						<div key={index} className="border rounded p-4">
							<h1 className="font-semibold text-gray-800 text-lg">Resep {index + 1}</h1>
							<p className="text-gray-700 text-sm">{prescriprion_detail.content}</p>
						</div>
					))}
				</div>
			</Modal>

			<ModalAlert
				isOpen={modal_alert_delete_is_open}
				onClose={onCloseAlert}
				title={'Yakin menghapus data?'}
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
