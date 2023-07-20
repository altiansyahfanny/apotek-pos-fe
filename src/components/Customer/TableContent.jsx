import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCustomerQueryState,
	setAllForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/customerSlice';
import Table from '../Table';
import { badgeBackground } from '../../utils/color';
import moment from 'moment';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { numberTabelWithPagination } from '../../helper/table';

const StatusBadge = ({ customer }) => {
	let bg;
	let status;

	if (customer.status) {
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
			<Table.THD>Nama Pelanggan</Table.THD>
			<Table.THD>Kode Pelanggan</Table.THD>
			<Table.THD>Tanggal Lahir</Table.THD>
			<Table.THD>Email</Table.THD>
			<Table.THD>Nomor Hp.</Table.THD>
			<Table.THD>Alamat</Table.THD>
			<Table.THD textAlign="center">Status</Table.THD>
			<Table.THD textAlign="center">Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = ({ data }) => {
	const dispatch = useDispatch();
	const { limit, current_page } = useSelector(getCustomerQueryState);

	const onClickEdit = (customer) => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }));
		dispatch(setAllForm({ ...customer, is_edit: true }));
	};

	return (
		<div className="mt-2">
			<Table>
				<TableHead />
				<Table.TB>
					{data.data.map((customer, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{customer.name}</Table.TBD>
							<Table.TBD>{customer.member_code}</Table.TBD>
							<Table.TBD>{moment(customer.birth_date).format('DD MMMM YYYY')}</Table.TBD>
							<Table.TBD>{customer.email}</Table.TBD>
							<Table.TBD>{customer.phone_number}</Table.TBD>
							<Table.TBD>{customer.address}</Table.TBD>
							<Table.TBD textAlign="center">
								<StatusBadge customer={customer} />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction labelIcon={<IoMdOptions />}>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Edit'}
										action={() => onClickEdit(customer)}
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
