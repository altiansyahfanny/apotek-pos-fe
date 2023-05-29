import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/UserAccess/FilterAction';
import TableContent from '../../components/UserAccess/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useSelector } from 'react-redux';
import { getUserAccessState, setLimit, setKeySearch } from '../../redux/reducer/userAccessSlice';

const UserAccess = () => {
	const { limit, key_search } = useSelector(getUserAccessState);

	let content = <TableContent />;
	return (
		<MainLayout title="Hak Akses Pengguna">
			<MainLayout.Header title={'Hak Akses Pengguna'}>
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

export default UserAccess;
