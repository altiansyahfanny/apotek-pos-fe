import React from 'react';
import { useSelector } from 'react-redux';
import { FilterWarehouse, Loader } from '../../components';
import FilterAction from '../../components/ProductList/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import TableContent from '../../components/ProductList/TableContent';
import { useGetProductsWithPaginationQuery } from '../../redux/api/productApi';
import { getProductQueryState, setQuery } from '../../redux/reducer/productSlice';
import { MainLayout } from '../../templates';
import usePermissions from '../../hooks/usePermissions';

const ProductList = () => {
	const { limit, key_search, warehouse_id, current_page } = useSelector(getProductQueryState);

	const { data, isLoading, isError, error, isSuccess } = useGetProductsWithPaginationQuery({
		current_page,
		per_page: limit,
		key_search,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>Error</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}

	const { hasPermission } = usePermissions();

	// console.log('hasPermission : ', hasPermission('user.delete'));

	return (
		<MainLayout title="Daftar Produk (Semua Gudang)">
			<MainLayout.Header title={'Daftar Produk'}>
				<FilterWarehouse value={warehouse_id} action={setQuery} />
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setQuery }} />
				<SearchInput {...{ value: key_search, action: setQuery }} />
			</MainLayout.LimiterContainer>

			{content}
		</MainLayout>
	);
};

export default ProductList;
