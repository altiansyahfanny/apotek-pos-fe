import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput, Loader } from '../../components';
import InputCustomer from '../../components/InputCustomer';
import InputDoctor from '../../components/InputDoctor';
import InputPrescription from '../../components/RedeemPrescription/InputPrescription';
import {
	getPrescriptionFormState,
	setAllForm,
	setForm,
} from '../../redux/reducer/prescriptionSlice';
import { MainLayout } from '../../templates';
import { useParams } from 'react-router-dom';
import { useGetPrescriptionByIdQuery } from '../../redux/api/prescriptionApi';
import moment from 'moment';

const RedeemPrescription = () => {
	const dispatch = useDispatch();

	let { id } = useParams();
	const form = useSelector(getPrescriptionFormState);

	const { data, isSuccess, isLoading, isError, error } = useGetPrescriptionByIdQuery(id);
	console.log('data outside: ', data);
	useEffect(() => {
		if (data && isSuccess) {
			console.log('data : ', data);

			dispatch(
				setAllForm({
					...data,
					date: moment(data.date).format('YYYY-MM-DDTHH:mm'),
					name: '',
					product_prescriptions: [],
				})
			);
		}
	}, [data, isSuccess]);

	const onChange = (event) => {
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value: value }));
	};

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>Error</p>;
	if (isSuccess) {
		content = (
			<>
				<div className="grid grid-cols-3 gap-4">
					<FormInput>
						<FormInput.Label title={'Nama Resep'} required={true} />
						<FormInput.TextInput name={'name'} value={form.name} onChange={onChange} />
					</FormInput>

					{/* <InputWarehouse /> */}
					<InputCustomer customer_id={form.customer_id} setForm={setForm} />
					<FormInput>
						<FormInput.Label title={'Biaya Embalase'} required={true} />
						<FormInput.TextInput
							name={'embalase_fee'}
							value={form.embalase_fee}
							onChange={onChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Kode Resep'} required={true} />
						<FormInput.TextInput
							name={'code'}
							value={form.code}
							onChange={onChange}
							disabled={true}
						/>
					</FormInput>
					<InputDoctor doctor_id={form.doctor_id} setForm={setForm} />
					<FormInput>
						<FormInput.Label title={'Biaya Layanan'} required={true} />
						<FormInput.TextInput
							name={'service_fee'}
							value={form.service_fee}
							onChange={onChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Tanggal Resep'} required={true} />
						<FormInput.TextInput
							type="datetime-local"
							name={'date'}
							value={form.date}
							onChange={onChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Catatan'} required={true} />
						<FormInput.TextInput name={'note'} value={form.note} onChange={onChange} />
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Status Resep'} required={true} />
						<FormInput.InputSelect name={'status'} value={form.status} onChange={onChange}>
							<FormInput.InputSelect.Option value={1}>Lunas</FormInput.InputSelect.Option>
							<FormInput.InputSelect.Option value={2}>
								Dibayar Sebagian
							</FormInput.InputSelect.Option>
							<FormInput.InputSelect.Option value={3}>Belum Ditebus</FormInput.InputSelect.Option>
						</FormInput.InputSelect>
					</FormInput>
				</div>
				<InputPrescription />
			</>
		);
	}

	return <MainLayout title="Tebus Resep">{content}</MainLayout>;
};

export default RedeemPrescription;
