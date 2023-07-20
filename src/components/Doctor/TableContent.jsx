import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	getDoctorQueryState,
	setAllForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/doctorSlice';
import Table from '../Table';
import { badgeBackground } from '../../utils/color';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { numberTabelWithPagination } from '../../helper/table';

const StatusBadge = ({ doctor }) => {
	let bg;
	let status;

	if (doctor.status) {
		status = 'Aktif';
		bg = badgeBackground.success;
	} else {
		status = 'Tidak Aktif';
		bg = badgeBackground.danger;
	}

	return <Table.StatusBadge bg={bg} status={status} />;
};

const TableHead = () => {
	return (
		<Table.TH>
			<Table.THD textAlign="center">No</Table.THD>
			<Table.THD>Nama Dokter</Table.THD>
			<Table.THD>Nomor S.I.P</Table.THD>
			<Table.THD>Email</Table.THD>
			<Table.THD>Nomor Hp.</Table.THD>
			<Table.THD>Alamat</Table.THD>
			<Table.THD>Spesialis</Table.THD>
			<Table.THD textAlign="center">Status</Table.THD>
			<Table.THD textAlign="center">Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = ({ data }) => {
	const dispatch = useDispatch();
	const { limit, current_page } = useSelector(getDoctorQueryState);

	const onClickEdit = (doctor) => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }));
		dispatch(setAllForm({ ...doctor, is_edit: true }));
	};

	return (
		<div className="mt-2">
			<Table>
				<TableHead />
				<Table.TB>
					{data.data.map((doctor, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{doctor.name}</Table.TBD>
							<Table.TBD>{doctor.sip}</Table.TBD>
							<Table.TBD>{doctor.email}</Table.TBD>
							<Table.TBD>{doctor.phone_number}</Table.TBD>
							<Table.TBD>{doctor.address}</Table.TBD>
							<Table.TBD>{doctor.specialization}</Table.TBD>
							<Table.TBD textAlign="center">
								<StatusBadge {...{ doctor }} />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction labelIcon={<IoMdOptions />}>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Edit'}
										action={() => onClickEdit(doctor)}
									/>
								</Table.ButtonAction>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<Table.Pagination {...{ data, current_page, setQuery, limit }} />
		</div>
	);
};

export default TableContent;
