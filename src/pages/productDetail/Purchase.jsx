import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TableContent from '../../components/ProductDetail/Purchase/TableContent';
import { useGetProductPurchasesWithPaginationByIdQuery } from '../../redux/api/productApi';
import { getProductPurchaseQueryState } from '../../redux/reducer/productPurchaseSlice';
import { useGetPurchaseByProductIdQuery } from '../../redux/api/purchaseApi';
import { Loader } from '../../components';

const Purchase = () => {
	const { id } = useParams();
	const { limit, current_page } = useSelector(getProductPurchaseQueryState);

	const { data, isLoading, isSuccess, isError, error } = useGetPurchaseByProductIdQuery({
		id,
		per_page: limit,
		current_page,
	});

	console.log('data : ', data);

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = <TableContent data={data} />;
	}
	return content;
};

export default Purchase;
