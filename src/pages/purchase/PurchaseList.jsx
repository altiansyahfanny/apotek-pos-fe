import React from 'react';
import { useSelector } from 'react-redux';
import { FilterWarehouse, Loader } from '../../components';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import FilterAction from '../../components/Purchase/FilterAction';
import TableContent from '../../components/Purchase/TableContent';
import { useGetInvoicesQuery } from '../../redux/api/invoiceApi';
import {
	getPurchaseState,
	setKeySearch,
	setLimit,
	setWarehouse,
} from '../../redux/reducer/purchaseSlice';
import { MainLayout } from '../../templates';

const PurchaseList = () => {
	const { limit, key_search, warehouse_id } = useSelector(getPurchaseState);

	const { data, isLoading, isError, error, isSuccess } = useGetInvoicesQuery();

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>Error</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}
	return (
		<MainLayout title="Daftar Pembelian (Semua Gudang)">
			<MainLayout.Header title={'Daftar Pembelian'}>
				<FilterWarehouse value={warehouse_id} action={setWarehouse} />
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setLimit }} />
				<SearchInput {...{ value: key_search, action: setKeySearch }} />
			</MainLayout.LimiterContainer>

			{content}
		</MainLayout>
	);
};

export default PurchaseList;
