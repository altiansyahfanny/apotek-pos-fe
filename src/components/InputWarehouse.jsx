import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetWarehousesQuery } from '../redux/api/warehouseApi';
import FormInput from './FormInput';

const InputWarehouse = ({ warehouse_id, setForm }) => {
	const dispatch = useDispatch();

	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [placeholder, setPlaceholder] = useState('Pilih Gudang');
	const regex = new RegExp(keyword, 'i');

	const { data: WAREHOUSES, isLoading, isSuccess } = useGetWarehousesQuery();

	const onClick = (warehouse) => {
		setIsOpen(false);
		setPlaceholder(warehouse.name);
		dispatch(setForm({ key: 'warehouse_id', value: warehouse.id }));
	};

	useEffect(() => {
		if (isSuccess) {
			if (warehouse_id && warehouse_id !== '') {
				const currWarehouse = WAREHOUSES.find((warehouse) => warehouse.id === warehouse_id);
				setPlaceholder(currWarehouse.name);
			}
		}
	}, [warehouse_id, isSuccess]);

	let content;
	if (isSuccess) {
		content = WAREHOUSES.filter((warehouse) => regex.test(warehouse.name))
			.slice(0, 5)
			.map((warehouse, index) => (
				<FormInput.OptionInputSelectWithSearch
					key={index}
					value={warehouse.id}
					onClick={() => onClick(warehouse)}
					isActive={warehouse.id === warehouse_id}
				>
					{warehouse.name}
				</FormInput.OptionInputSelectWithSearch>
			));
	}
	return (
		<FormInput>
			<FormInput.Label title={'Pilih Gudang'} required={true} />
			<FormInput.InputSelectWithSearch
				{...{
					isOpen,
					setIsOpen,
					keyword,
					setKeyword,
					placeholder,
					disabled: isLoading,
					name: 'warehouse_id',
				}}
			>
				{content}
			</FormInput.InputSelectWithSearch>
		</FormInput>
	);
};

export default InputWarehouse;
