import React from 'react';
import { useSelector } from 'react-redux';
import { getConsignmentState, setWarehouse } from '../../redux/reducer/consignmentSlice';
import { FilterWarehouse } from '../../components';
import FilterAction from '../../components/Consignment/FilterAction';
import TableContent from '../../components/Consignment/TableContent';
import { MainLayout } from '../../templates';

const ConsignmentList = () => {
	const { limit, key_search, warehouse_id } = useSelector(getConsignmentState);

	let content;

	content = <TableContent />;
	return (
		<MainLayout title="Daftar Konsinyasi (Semua Gudang)">
			<MainLayout.Header title={'Daftar Konsinyasi'}>
				<FilterWarehouse value={warehouse_id} action={setWarehouse} />
				<FilterAction />
			</MainLayout.Header>

			{content}
		</MainLayout>
	);
};

export default ConsignmentList;
