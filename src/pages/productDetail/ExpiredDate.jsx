import React from 'react';
import TableContent from '../../components/ProductDetail/ExpiredDate/TableContent';
import { BsFilterRight } from 'react-icons/bs';
import FilterDate from '../../components/ProductDetail/ExpiredDate/FilterDate';
import MainLayout from '../../templates/MainLayout';
import { useSelector } from 'react-redux';
import { getProductDetailState } from '../../redux/reducer/productDetailSlice';

const ExpiredDate = () => {
	const { expired_date } = useSelector(getProductDetailState);
	return (
		<div>
			<MainLayout.Header title={expired_date.filter_date.value.filter_name}>
				<FilterDate />
			</MainLayout.Header>
			<TableContent />;
		</div>
	);
};

export default ExpiredDate;
