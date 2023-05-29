import React from 'react';
import { useSelector } from 'react-redux';
import { FilterWarehouse } from '../../components';
import FilterAction from '../../components/ProductExpired/FilterAction';
import TableContent from '../../components/ProductExpired/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import {
	getProductExpiredState,
	setKeySearch,
	setLimit,
	setWarehouse,
} from '../../redux/reducer/productExpiredSlice';
import { MainLayout } from '../../templates';

const ProductExpired = () => {
	const { limit, key_search, warehouse_id } = useSelector(getProductExpiredState);

	let content = <TableContent />;

	return (
		<MainLayout title="Stok Kedaluarsa (Semua Gudang)">
			<MainLayout.Header title={'Stok Kedaluarsa (Semua Gudang)'}>
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

export default ProductExpired;
