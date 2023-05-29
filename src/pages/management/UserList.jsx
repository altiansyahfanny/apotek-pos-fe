import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/User/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { getUserState, setKeySearch, setLimit } from '../../redux/reducer/userSlice';
import TableContent from '../../components/User/TableContent';
import { useSelector } from 'react-redux';

const UserList = () => {
	const { limit, key_search } = useSelector(getUserState);

	let content;

	content = <TableContent />;
	return (
		<MainLayout title="Daftar Pengguna">
			<MainLayout.Header title={'Daftar Pengguna'}>
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

export default UserList;
