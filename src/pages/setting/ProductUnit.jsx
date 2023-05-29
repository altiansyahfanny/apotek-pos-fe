import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/ProductUnit/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useSelector } from 'react-redux';
import { getproductUnitState, setKeySearch, setLimit } from '../../redux/reducer/productUnitSlice';
import TableContent from '../../components/ProductUnit/TableContent';

const ProductUnit = () => {
	const { limit, key_search } = useSelector(getproductUnitState);

	let content = <TableContent />;
	return (
		<MainLayout title="Satuan Produk">
			<MainLayout.Header title={'Satuan Produk'}>
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

export default ProductUnit;
