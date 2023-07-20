import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { getPrescriptionFormState, setForm } from '../../redux/reducer/prescriptionSlice';
import FormInput from '../FormInput';

const InputDoctor = () => {
	const dispatch = useDispatch();
	const form = useSelector(getPrescriptionFormState);
	const { data: DOCTORS, isLoading, isSuccess } = useGetDoctorsQuery();

	const onChange = (event) => {
		dispatch(setForm({ key: 'doctor_id', value: event.target.value }));
	};

	let content;
	if (isSuccess) {
		content = DOCTORS.map((warehouse, index) => (
			<FormInput.InputSelect.Option key={index} value={warehouse.id}>
				{warehouse.name}
			</FormInput.InputSelect.Option>
		));
	}
	return (
		<FormInput>
			<FormInput.Label title={'Dokter'} required={true} />
			<FormInput.InputSelect
				value={form.doctor_id}
				name="doctor_id"
				onChange={onChange}
				disabled={isLoading}
			>
				<FormInput.InputSelect.Option value={''}>Pilih Dokter</FormInput.InputSelect.Option>
				{content}
			</FormInput.InputSelect>
		</FormInput>
	);
};

export default InputDoctor;
