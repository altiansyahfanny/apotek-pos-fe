import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../components';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import FilterAction from '../../components/UserAccess/FilterAction';
import TableContent from '../../components/UserAccess/TableContent';
import { useGetUsersWithPaginationQuery } from '../../redux/api/userApi';
import { getUserAccessQueryState, setQuery } from '../../redux/reducer/userAccessSlice';
import { MainLayout } from '../../templates';

const UserAccess = () => {
	const { limit, key_search, current_page } = useSelector(getUserAccessQueryState);

	const { data, isSuccess, isLoading, isError, error } = useGetUsersWithPaginationQuery({
		per_page: limit,
		key_search,
		current_page,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}

	return (
		<MainLayout title="Hak Akses Pengguna">
			<MainLayout.Header title={'Hak Akses Pengguna'}>
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

export default UserAccess;
