import React from 'react';
import { BiExport, BiImport } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import Dropdown from '../Dropdown';

const FilterAction = () => {
	return (
		<Dropdown labelIcon={<FaListUl size={14} />}>
			<Dropdown.Option>
				<BsPlusCircle size={14} />
				<span>Tambah Rak</span>
			</Dropdown.Option>
		</Dropdown>
	);
};

export default FilterAction;
