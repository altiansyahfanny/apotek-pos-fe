import React from 'react';
import { MainLayout } from '../../templates';
import FilterAction from '../../components/Doctor/FilterAction';
import Limiter from '../../components/ProductList/Limiter';
import SearchInput from '../../components/ProductList/SearchInput';
import { useSelector } from 'react-redux';
import { getDoctorState, setKeySearch, setLimit } from '../../redux/reducer/doctorSlice';
import TableContent from '../../components/Doctor/TableContent';

const DoctorList = () => {
	const { limit, key_search } = useSelector(getDoctorState);

	let content;

	content = <TableContent />;
	return (
		<MainLayout title="Daftar Dokter">
			<MainLayout.Header title={'Daftar Dokter'}>
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

export default DoctorList;
