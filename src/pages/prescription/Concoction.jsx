import React from 'react';
import { useSelector } from 'react-redux';
import { FilterWarehouse } from '../../components';
import FilterAction from '../../components/Concoction/FilterAction';
import TableContent from '../../components/Concoction/TabelContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import {
	getConcoctionState,
	setKeySearch,
	setLimit,
	setWarehouse,
} from '../../redux/reducer/concoctionSlice';
import { MainLayout } from '../../templates';

const Concoction = () => {
	const { limit, key_search, warehouse_id } = useSelector(getConcoctionState);

	let content = <TableContent />;

	return (
		<MainLayout title="Racikan (Semua Gudang)">
			<MainLayout.Header title={'Racikan'}>
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

export default Concoction;
