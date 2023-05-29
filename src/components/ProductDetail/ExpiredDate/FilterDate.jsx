import React from 'react';
import { BsFilterRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProductDetailState,
	setFilterDateExpDate,
} from '../../../redux/reducer/productDetailSlice';
import Dropdown from '../../Dropdown';

const FilterDate = ({ value, action }) => {
	const dispatch = useDispatch();
	const { expired_date } = useSelector(getProductDetailState);

	const onSelect = (filter) => {
		dispatch(setFilterDateExpDate(filter));
	};

	return (
		<Dropdown {...{ labelIcon: <BsFilterRight size={14} /> }}>
			{expired_date.filter_date.options.map((filter) => {
				return (
					<Dropdown.Option
						key={filter.filter_id}
						value={filter.filter_id}
						isActive={Number(expired_date.filter_date.value.filter_id) === Number(filter.filter_id)}
						action={() => onSelect(filter)}
					>
						<span>{filter.filter_name}</span>
					</Dropdown.Option>
				);
			})}
		</Dropdown>
	);
};

export default FilterDate;
