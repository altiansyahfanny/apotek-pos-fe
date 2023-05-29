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
				<span>Tambah Resep</span>
			</Dropdown.Option>
			<Dropdown.Option>
				<BiImport size={14} />
				<span>Import Resep</span>
			</Dropdown.Option>
			<Dropdown.Option>
				<BiExport size={14} />
				<span>Export Resep</span>
			</Dropdown.Option>
		</Dropdown>
	);
};

export default FilterAction;
