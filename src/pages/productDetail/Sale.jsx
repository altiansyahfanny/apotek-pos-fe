import React from 'react';
import TableContent from '../../components/ProductDetail/Sale/TableContent';
import { useGetProductSalesByProductIdQuery } from '../../redux/api/productSalesApi';
import { Loader } from '../../components';
import { useParams } from 'react-router-dom';
import { getProductSaleQueryState } from '../../redux/reducer/productSaleSlice';
import { useSelector } from 'react-redux';

const Sale = () => {
	const { id } = useParams();
	const { limit, current_page } = useSelector(getProductSaleQueryState);

	const { data, isLoading, isError, error, isSuccess } = useGetProductSalesByProductIdQuery({
		id,
		per_page: limit,
		current_page,
	});

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}
	return content;
};

export default Sale;
