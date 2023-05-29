import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/Customer/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useSelector } from 'react-redux';
import { getCustomerState, setKeySearch, setLimit } from '../../redux/reducer/customerSlice';
import TableContent from '../../components/Customer/TableContent';

const CustomerList = () => {
	const { limit, key_search } = useSelector(getCustomerState);

	let content;

	content = <TableContent />;
	return (
		<MainLayout title="Daftar Pelanggan">
			<MainLayout.Header title={'Daftar Pelanggan'}>
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

export default CustomerList;
