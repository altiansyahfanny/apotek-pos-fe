import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/Rack/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useSelector } from 'react-redux';
import { getRackState, setKeySearch, setLimit } from '../../redux/reducer/rackSlice';
import TableContent from '../../components/Rack/TableContent';

const Rack = () => {
	const { limit, key_search } = useSelector(getRackState);

	let content = <TableContent />;
	return (
		<MainLayout title="Rak">
			<MainLayout.Header title={'Rak'}>
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

export default Rack;
