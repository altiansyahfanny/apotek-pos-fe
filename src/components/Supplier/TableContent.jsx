import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Pagination from '../Pagination';
import Table from '../Table';
import {
	getSupplierQueryState,
	setModalDialog,
	setQuery,
	setAllForm,
} from '../../redux/reducer/supplierSlice';
import { useDispatch, useSelector } from 'react-redux';
import { badgeBackground } from '../../utils/color';
import { AiOutlineArrowRight } from 'react-icons/ai';

const StatusBadge = ({ supplier }) => {
	let bg;
	let status;

	if (supplier.status) {
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
			<Table.THD>Supplier</Table.THD>
			<Table.THD>Nomor Hp.</Table.THD>
			<Table.THD>Email</Table.THD>
			<Table.THD>Alamat</Table.THD>
			<Table.THD textAlign="center">Status</Table.THD>
			<Table.THD textAlign="center">Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = ({ data }) => {
	const dispatch = useDispatch();
	const { limit, current_page } = useSelector(getSupplierQueryState);

	const onClickEdit = (supplier) => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }));
		dispatch(setAllForm({ ...supplier, is_edit: true }));
	};

	return (
		<div className="mt-2">
			<Table>
				<TableHead />
				<Table.TB>
					{data.data.map((supplier, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">{index + 1}</Table.TBD>
							<Table.TBD>{supplier.name}</Table.TBD>
							<Table.TBD>{supplier.phone_number}</Table.TBD>
							<Table.TBD>{supplier.email}</Table.TBD>
							<Table.TBD>{supplier.address}</Table.TBD>
							<Table.TBD textAlign="center">
								<StatusBadge {...{ supplier }} />
							</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction labelIcon={<IoMdOptions />}>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Edit'}
										action={() => onClickEdit(supplier)}
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
