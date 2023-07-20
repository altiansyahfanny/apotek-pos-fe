import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterWarehouse, Loader, Modal } from '../../components';
import FilterAction from '../../components/PrescriptionList/FilterAction';
import Form from '../../components/PrescriptionList/Form/AcceptPrescription/Form';
import TableContent from '../../components/PrescriptionList/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import {
	useGetPrescriptionsQuery,
	useGetPrescriptionsWithPaginationQuery,
} from '../../redux/api/prescriptionApi';
import {
	getPrescriptionModalState,
	getPrescriptionQueryState,
	resetForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/prescriptionSlice';
import { MainLayout } from '../../templates';

const PrescriptionList = () => {
	const dispatch = useDispatch();
	const { limit, key_search, warehouse_id, current_page } = useSelector(getPrescriptionQueryState);
	const { modal_accept_is_open } = useSelector(getPrescriptionModalState);

	const { data, isLoading, isSuccess, error, isError } = useGetPrescriptionsWithPaginationQuery({
		current_page,
		per_page: limit,
		key_search,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) content = <TableContent data={data} />;

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_accept_is_open', value: false }));
		dispatch(resetForm());
	};

	return (
		<MainLayout title={'Daftar Resep (Semua Gudang)'}>
			<MainLayout.Header title={'Daftar Resep'}>
				<FilterWarehouse value={warehouse_id} action={setQuery} />
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setQuery }} />
				<SearchInput {...{ value: key_search, action: setQuery }} />
			</MainLayout.LimiterContainer>

			{content}

			<Modal isOpen={modal_accept_is_open} closeModal={closeModal} title={'Terima Resep'}>
				<Form />
			</Modal>
		</MainLayout>
	);
};

export default PrescriptionList;
