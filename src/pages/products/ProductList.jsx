import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterWarehouse, Loader, Modal } from '../../components';
import FilterAction from '../../components/ProductList/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import TableContent from '../../components/ProductList/TableContent';
import {
	getProductModalState,
	getProductState,
	setKeySearch,
	setLimit,
	setModalDialog,
	setWarehouse,
} from '../../redux/reducer/productSlice';
import { MainLayout } from '../../templates';
import { useGetProductsQuery } from '../../redux/api/productApi';

const ProductList = () => {
	const dispatch = useDispatch();

	const { limit, key_search, warehouse_id } = useSelector(getProductState);
	const { modal_add_is_open } = useSelector(getProductModalState);

	const { data, isLoading, isError, error, isSuccess } = useGetProductsQuery();

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>Error</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}

	return (
		<MainLayout title="Daftar Produk (Semua Gudang)">
			<MainLayout.Header title={'Daftar Produk'}>
				<FilterWarehouse value={warehouse_id} action={setWarehouse} />
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setLimit }} />
				<SearchInput {...{ value: key_search, action: setKeySearch }} />
			</MainLayout.LimiterContainer>

			{content}

			<Modal
				isOpen={modal_add_is_open}
				closeModal={() => dispatch(setModalDialog({ key: 'modal_add_is_open', value: false }))}
				title={'Tambah Produk'}
			>
				Oke
			</Modal>
		</MainLayout>
	);
};

export default ProductList;
