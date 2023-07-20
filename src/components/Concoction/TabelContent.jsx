import React, { useState } from 'react';
import { IoMdOptions } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConcoctionModalState,
	getConcoctionQueryState,
	setAllForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/concoctionSlice';
import Table from '../Table';
import { AiOutlineArrowRight } from 'react-icons/ai';
import ModalAlert from '../ModalAlert';
import { useDeleteConcoctionMutation } from '../../redux/api/concoctionApi';
import { toastError, toastSuccess } from '../../helper/toast';
import { numberTabelWithPagination } from '../../helper/table';

const ButtonOpname = ({ status, bg = 'bg-lime-500', onClick }) => {
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
			<Table.THD>Nama Racikan</Table.THD>
			<Table.THD textAlign="center">Satuan</Table.THD>
			<Table.THD>Komposisi Obat</Table.THD>
			<Table.THD>Catatan</Table.THD>
			<Table.THD textAlign="center">Aksi</Table.THD>
		</Table.TH>
	);
};

const TableContent = ({ data }) => {
	const dispatch = useDispatch();

	const { limit, current_page } = useSelector(getConcoctionQueryState);
	const { modal_alert_delete_is_open } = useSelector(getConcoctionModalState);
	const [id, setId] = useState(null);

	const [deleteConcoction, responseDelete] = useDeleteConcoctionMutation();

	const onClickDelete = (id) => {
		setId(id);
		dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: true }));
	};

	const onCloseAlert = () => {
		dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: false }));
	};

	const onDeleteConfirm = async () => {
		try {
			const response = await deleteConcoction(id).unwrap();
			toastSuccess(response.message);
			dispatch(setModalDialog({ key: 'modal_alert_delete_is_open', value: false }));
		} catch (error) {
			toastError(error.data.message);
		}
	};

	const onClickEdit = (concoction) => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }));

		const newValue = concoction.product_concoctions.map((ps) => {
			const other_product_units = [...ps.product.other_product_units];
			let new_product_units = [
				{
					...ps.product.product_unit,
					number_of_other_product_units: 1,
					number_of_product_units: 1,
				},
			];

			if (other_product_units.length) {
				other_product_units.map((other_product_unit) =>
					new_product_units.push({
						id: other_product_unit.product_unit.id,
						name: other_product_unit.product_unit.name,
						number_of_other_product_units: other_product_unit.number_of_other_product_units,
						number_of_product_units: other_product_unit.number_of_product_units,
					})
				);
			}
			return {
				id: ps.id,
				product_id: ps.product.id,
				name: ps.product.name,
				product_units: new_product_units,
				product_unit_id: ps.product_unit_id,
				qty: ps.qty,
				product_unit_type: new_product_units.find((pu) => pu.id === ps.product_unit_id).name,
				// qty_from_product_unit: new_product_units.find((pu) => pu.id === ps.product_unit_id).number_of_product_units,
				is_delete: false,
				is_edit: true,
			};
		});

		dispatch(setAllForm({ ...concoction, product_concoctions: newValue, is_edit: true }));
	};

	return (
		<div className="mt-2">
			<Table>
				<TableHead />
				<Table.TB>
					{data.data.map((concoction, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{concoction.name}</Table.TBD>
							<Table.TBD textAlign="center">{concoction.product_unit.name}</Table.TBD>
							<Table.TBD>
								{concoction.product_concoctions.map((pc, index) => (
									<p key={index}>{`${pc.product.name} (${pc.qty} ${pc.product_unit.name})`}</p>
								))}
							</Table.TBD>
							<Table.TBD>{concoction.note}</Table.TBD>
							<Table.TBD textAlign="center">
								<Table.ButtonAction labelIcon={<IoMdOptions />}>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										text={'Edit'}
										action={() => onClickEdit(concoction)}
									/>
									<Table.ButtonAction.Option
										icon={<AiOutlineArrowRight size={18} />}
										color="text-red-500"
										text={'Hapus'}
										action={() => onClickDelete(concoction.id)}
									/>
								</Table.ButtonAction>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<Table.Pagination {...{ data, current_page, setQuery, limit }} />

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
