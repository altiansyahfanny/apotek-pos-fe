import React from 'react';
import { BiExport, BiImport } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import Dropdown from '../Dropdown';
import { useDispatch } from 'react-redux';
import { setModalDialog } from '../../redux/reducer/productSlice';
import { useNavigate } from 'react-router-dom';

const FilterAction = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickAdd = () => {
		navigate('create');
	};
	const handleImpor = () => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }));
	};
	return (
		<Dropdown labelIcon={<FaListUl size={14} />}>
			<Dropdown.Option action={handleClickAdd}>
				<BsPlusCircle size={14} />
				<span>Tambah Produk</span>
			</Dropdown.Option>
			<Dropdown.Option action={handleImpor}>
				<BiImport size={14} />
				<span>Import Produk</span>
			</Dropdown.Option>
			<Dropdown.Option>
				<BiExport size={14} />
				<span>Export Produk</span>
			</Dropdown.Option>
		</Dropdown>
	);
};

export default FilterAction;
