import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import Dropdown from '../Dropdown';
import { useDispatch } from 'react-redux';
import { setModalDialog } from '../../redux/reducer/doctorSlice';

const FilterAction = () => {
	const dispatch = useDispatch();
	return (
		<Dropdown labelIcon={<FaListUl size={14} />}>
			<Dropdown.Option
				action={() => dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }))}
			>
				<BsPlusCircle size={14} />
				<span>Tambah Dokter</span>
			</Dropdown.Option>
		</Dropdown>
	);
};

export default FilterAction;
