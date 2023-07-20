import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Modal } from '../../components';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import FilterAction from '../../components/Supplier/FilterAction';
import TableContent from '../../components/Supplier/TableContent';
import { useGetSuppliersWithPaginationQuery } from '../../redux/api/supplierApi';
import {
	getSupplierModalDialogState,
	getSupplierQueryState,
	resetForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/supplierSlice';
import { MainLayout } from '../../templates';
import Form from '../../components/Supplier/Form';

const SupplierList = () => {
	const dispatch = useDispatch();
	const { limit, key_search, current_page } = useSelector(getSupplierQueryState);
	const { modal_add_is_open } = useSelector(getSupplierModalDialogState);

	const { data, isError, isSuccess, isLoading, error } = useGetSuppliersWithPaginationQuery({
		current_page,
		per_page: limit,
		key_search,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) content = <TableContent data={data} />;

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: false }));
		dispatch(resetForm());
	};

	return (
		<MainLayout title="Daftar Supplier">
			<MainLayout.Header title={'Daftar Supplier'}>
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

export default SupplierList;
