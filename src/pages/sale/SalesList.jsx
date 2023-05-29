import React from 'react';
import { MainLayout } from '../../templates';
import { FilterWarehouse } from '../../components';
import { useSelector } from 'react-redux';
import { getSaleState, setKeySearch, setWarehouse, setLimit } from '../../redux/reducer/saleSlice';
import FilterAction from '../../components/saleList/FilterAction';
import TableContent from '../../components/saleList/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';

const SalesList = () => {
	const { limit, key_search, warehouse_id } = useSelector(getSaleState);

	let content = <TableContent />;
	return (
		<MainLayout title="Daftar Penjualan (Semua Gudang)">
			<MainLayout.Header title={'Daftar Penjualan'}>
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

export default SalesList;
