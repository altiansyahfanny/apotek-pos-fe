import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../components';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import FilterAction from '../../components/User/FilterAction';
import TableContent from '../../components/User/TableContent';
import { useGetUsersWithPaginationQuery } from '../../redux/api/userApi';
import { getUserQueryState, setQuery } from '../../redux/reducer/userSlice';
import { MainLayout } from '../../templates';

const UserList = () => {
	const { limit, key_search, current_page } = useSelector(getUserQueryState);

	const { data, isSuccess, isLoading, isError, error } = useGetUsersWithPaginationQuery({
		per_page: limit,
		key_search,
		current_page,
	});

	console.log('data : ', data);

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}
	return (
		<MainLayout title="Daftar Pengguna">
			<MainLayout.Header title={'Daftar Pengguna'}>
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

export default UserList;
