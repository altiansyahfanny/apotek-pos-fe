import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/Supplier/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useSelector } from 'react-redux';
import { getSupplierState, setKeySearch, setLimit } from '../../redux/reducer/supplierSlice';
import TableContent from '../../components/Supplier/TableContent';

const SupplierList = () => {
	const { limit, key_search } = useSelector(getSupplierState);

	let content;

	content = <TableContent />;
	return (
		<MainLayout title="Daftar Supplier">
			<MainLayout.Header title={'Daftar Supplier'}>
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

export default SupplierList;
