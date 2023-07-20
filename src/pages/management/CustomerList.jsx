import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterAction from '../../components/Customer/FilterAction';
import TableContent from '../../components/Customer/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import {
	getCustomerModalState,
	getCustomerQueryState,
	resetForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/customerSlice';
import { MainLayout } from '../../templates';
import { Loader, Modal } from '../../components';
import { useGetCustomersWithPaginationQuery } from '../../redux/api/customerApi';
import Form from '../../components/Customer/Form/Create/Form';

const CustomerList = () => {
	const dispatch = useDispatch();
	const { limit, key_search, current_page } = useSelector(getCustomerQueryState);
	const { modal_add_is_open } = useSelector(getCustomerModalState);

	const { data, isError, isSuccess, isLoading, error } = useGetCustomersWithPaginationQuery({
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
		<MainLayout title="Daftar Pelanggan">
			<MainLayout.Header title={'Daftar Pelanggan'}>
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setQuery }} />
				<SearchInput {...{ value: key_search, action: setQuery }} />
			</MainLayout.LimiterContainer>

			{content}

			<Modal isOpen={modal_add_is_open} closeModal={closeModal} title={'Tambah Pelanggan'}>
				<Form closeModal={closeModal} />
			</Modal>
		</MainLayout>
	);
};

export default CustomerList;
