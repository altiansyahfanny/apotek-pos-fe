import React from 'react';
import { useSelector } from 'react-redux';
import { FilterWarehouse } from '../../components';
import FilterAction from '../../components/PrescriptionList/FilterAction';
import TableContent from '../../components/PrescriptionList/TableContent';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import {
	getPrescriptionState,
	setKeySearch,
	setLimit,
	setWarehouse,
} from '../../redux/reducer/prescriptionSlice';
import { MainLayout } from '../../templates';

const PrescriptionList = () => {
	const { limit, key_search, warehouse_id } = useSelector(getPrescriptionState);

	let content;

	content = <TableContent />;

	return (
		<MainLayout title={'Daftar Resep (Semua Gudang)'}>
			<MainLayout.Header title={'Daftar Resep'}>
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

export default PrescriptionList;
