import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import Dropdown from '../Dropdown';

const FilterAction = () => {
	return (
		<Dropdown labelIcon={<FaListUl size={14} />}>
			<Dropdown.Option>
				<BsPlusCircle size={14} />
				<span>Tambah Supplier</span>
			</Dropdown.Option>
		</Dropdown>
	);
};

export default FilterAction;
