import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Modal } from '../../components';
import FilterAction from '../../components/Doctor/FilterAction';
import TableContent from '../../components/Doctor/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useGetDoctorsWithPaginationQuery } from '../../redux/api/doctorApi';
import {
	getDoctorModalState,
	getDoctorQueryState,
	setModalDialog,
	setQuery,
	resetForm,
} from '../../redux/reducer/doctorSlice';
import { MainLayout } from '../../templates';
import Form from '../../components/Doctor/Form/Create/Form';

const DoctorList = () => {
	const dispatch = useDispatch();
	const { limit, key_search, current_page } = useSelector(getDoctorQueryState);
	const { modal_add_is_open } = useSelector(getDoctorModalState);
	const { data, isError, error, isLoading, isSuccess } = useGetDoctorsWithPaginationQuery({
		current_page,
		per_page: limit,
		key_search,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: false }));
		dispatch(resetForm());
	};
	return (
		<MainLayout title="Daftar Dokter">
			<MainLayout.Header title={'Daftar Dokter'}>
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setQuery }} />
				<SearchInput {...{ value: key_search, action: setQuery }} />
			</MainLayout.LimiterContainer>

			{content}

			<Modal isOpen={modal_add_is_open} closeModal={closeModal} title={'Tambah Dokter'}>
				<Form closeModal={closeModal} />
			</Modal>
		</MainLayout>
	);
};

export default DoctorList;
