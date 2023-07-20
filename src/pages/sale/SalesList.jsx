import React from 'react';
import { useSelector } from 'react-redux';
import { FilterWarehouse, Loader } from '../../components';
import FilterDate from '../../components/ProductList/FilterDate';
import Limiter from '../../components/ProductList/Limiter';
import TableContent from '../../components/SaleList/TableContent';
import FilterAction from '../../components/saleList/FilterAction';
import { useGetSalesQuery } from '../../redux/api/saleApi';
import { getSaleQueryState, setQuery } from '../../redux/reducer/saleSlice';
import { MainLayout } from '../../templates';

const SalesList = () => {
	const { limit, current_page, warehouse_id, date } = useSelector(getSaleQueryState);
	const { start_date, end_date } = date;

	const { data, isSuccess, isLoading, isError, error } = useGetSalesQuery({
		current_page,
		per_page: limit,
		start_date,
		end_date,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}

	return (
		<MainLayout title="Daftar Penjualan (Semua Gudang)">
			<MainLayout.Header title={'Daftar Penjualan'}>
				<FilterWarehouse value={warehouse_id} action={setQuery} />
				<FilterAction />
			</MainLayout.Header>
			<MainLayout.LimiterContainer>
				<Limiter {...{ limit, setQuery }} />
				<FilterDate />
				{/* <SearchInput {...{ value: key_search, action: setKeySearch }} /> */}
			</MainLayout.LimiterContainer>

			{content}
		</MainLayout>
	);
};

export default SalesList;
