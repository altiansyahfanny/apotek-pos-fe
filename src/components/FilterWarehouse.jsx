import React from 'react';
import { FaWarehouse } from 'react-icons/fa';
import Dropdown from './Dropdown';
import { useDispatch } from 'react-redux';

const WAREHOUSE = [
	{ warehouse_id: 1, warehouse_name: 'Gudang Utama' },
	{ warehouse_id: 2, warehouse_name: 'Gudang Pasar' },
	{ warehouse_id: 3, warehouse_name: 'Gudang Kelayan' },
];

const FilterWarehouse = ({ value, action }) => {
	const dispatch = useDispatch();

	const onSelect = (id) => {
		dispatch(action({ key: 'warehouse_id', value: Number(id) }));
	};
	return (
		<Dropdown {...{ labelIcon: <FaWarehouse size={14} />, value, action }}>
			{WAREHOUSE.map((warehouse, index) => (
				<Dropdown.Option
					key={index}
					value={warehouse.warehouse_id}
					isActive={Number(value) === Number(warehouse.warehouse_id)}
					action={() => onSelect(warehouse.warehouse_id)}
				>
					<FaWarehouse size={14} />
					<span>{warehouse.warehouse_name}</span>
				</Dropdown.Option>
			))}
		</Dropdown>
	);
};

export default FilterWarehouse;
