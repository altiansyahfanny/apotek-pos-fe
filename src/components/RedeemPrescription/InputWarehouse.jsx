import React from 'react';
import FormInput from '../FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWarehousesQuery } from '../../redux/api/warehouseApi';
import { getPrescriptionFormState, setForm } from '../../redux/reducer/prescriptionSlice';

const InputWarehouse = () => {
	const dispatch = useDispatch();
	const form = useSelector(getPrescriptionFormState);
	const { data: WAREHOUSES, isLoading, isSuccess } = useGetWarehousesQuery();

	console.log('data : ', WAREHOUSES);

	const onChange = (event) => {
		dispatch(setForm({ key: 'warehouse_id', value: event.target.value }));
	};

	let content;
	if (isSuccess) {
		content = WAREHOUSES.map((warehouse, index) => (
			<FormInput.InputSelect.Option key={index} value={warehouse.id}>
				{warehouse.name}
			</FormInput.InputSelect.Option>
		));
	}
	return (
		<FormInput>
			<FormInput.Label title={'Gudang Penerima Barang'} required={true} />
			<FormInput.InputSelect
				value={form.warehouse_id}
				name="warehouse_id"
				onChange={onChange}
				disabled={isLoading}
			>
				<FormInput.InputSelect.Option value={''}>Pilih Gudang</FormInput.InputSelect.Option>
				{content}
			</FormInput.InputSelect>
		</FormInput>
	);
};

export default InputWarehouse;
