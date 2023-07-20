import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import Dropdown from '../Dropdown';
import { useNavigate } from 'react-router-dom';

const FilterAction = () => {
	const navigate = useNavigate();
	return (
		<Dropdown labelIcon={<FaListUl size={14} />}>
			<Dropdown.Option action={() => navigate('create')}>
				<BsPlusCircle size={14} />
				<span>Tambah Penjualan</span>
			</Dropdown.Option>
		</Dropdown>
	);
};

export default FilterAction;
