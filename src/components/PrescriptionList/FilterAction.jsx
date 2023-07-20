import React from 'react';
import { BiExport, BiImport } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import Dropdown from '../Dropdown';
import { useNavigate } from 'react-router-dom';
import { setModalDialog } from '../../redux/reducer/prescriptionSlice';
import { useDispatch } from 'react-redux';

const FilterAction = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<Dropdown labelIcon={<FaListUl size={14} />}>
			<Dropdown.Option
				action={() => dispatch(setModalDialog({ key: 'modal_accept_is_open', value: true }))}
			>
				<BsPlusCircle size={14} />
				<span>Tambah Resep</span>
			</Dropdown.Option>
			<Dropdown.Option action={() => navigate('create')}>
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
