import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterWarehouse, Loader, Modal } from '../../components';
import FilterAction from '../../components/Concoction/FilterAction';
import Form from '../../components/Concoction/Form/Form';
import TableContent from '../../components/Concoction/TabelContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useGetConcoctionsWithPaginationQuery } from '../../redux/api/concoctionApi';
import {
	getConcoctionModalState,
	getConcoctionQueryState,
	resetForm,
	setModalDialog,
	setQuery,
} from '../../redux/reducer/concoctionSlice';
import { MainLayout } from '../../templates';

const Concoction = () => {
	const dispatch = useDispatch();
	const { limit, key_search, warehouse_id, current_page } = useSelector(getConcoctionQueryState);
	const { modal_add_is_open } = useSelector(getConcoctionModalState);

	const { data, isLoading, isError, error, isSuccess } = useGetConcoctionsWithPaginationQuery({
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
		<MainLayout title="Racikan (Semua Gudang)">
			<MainLayout.Header title={'Racikan'}>
				<FilterWarehouse value={warehouse_id} action={setQuery} />
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setQuery }} />
				<SearchInput {...{ value: key_search, action: setQuery }} />
			</MainLayout.LimiterContainer>

			{content}

			<Modal
				isOpen={modal_add_is_open}
				closeModal={closeModal}
				title={'Tambah Template Racikan'}
				width="3xl"
			>
				<Form />
			</Modal>
		</MainLayout>
	);
};

export default Concoction;
