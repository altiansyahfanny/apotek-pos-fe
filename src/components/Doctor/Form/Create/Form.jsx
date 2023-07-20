import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSuccess } from '../../../../helper/toast';
import { useCreateDoctorMutation, useUpdateDoctorMutation } from '../../../../redux/api/doctorApi';
import { getDoctorFormState, setForm } from '../../../../redux/reducer/doctorSlice';
import { resetErrors, setErrors } from '../../../../redux/reducer/validationSlice';
import FormInput from '../../../FormInput';

const Form = ({ closeModal }) => {
	const dispatch = useDispatch();
	const form = useSelector(getDoctorFormState);

	const [create, { isLoading }] = useCreateDoctorMutation();
	const [update, responseUpdate] = useUpdateDoctorMutation();

	const onChange = (event) => {
		dispatch(setForm({ key: event.target.name, value: event.target.value }));
	};

	const onSummit = async () => {
		dispatch(resetErrors());

		try {
			let response;
			if (form.is_edit) {
				response = await update(form).unwrap();
			} else {
				response = await create(form).unwrap();
			}
			closeModal();
			toastSuccess(response.message);
		} catch (error) {
			if (error.status === 422) {
				toastError(error.data.message);
				return dispatch(setErrors(error.data.errors));
			}

			toastError('Terjadi Kesalahan');
		}
	};

	return (
		<div className="flex flex-col gap-1.5">
			<FormInput>
				<FormInput.Label title={'Nama Dokter'} required={true} />
				<FormInput.TextInput name={'name'} value={form.name} onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Nomor Surat Izin Prakter (SIP)'} />
				<FormInput.TextInput name={'sip'} value={form.sip} onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Spesialisasi'} />
				<FormInput.TextInput
					name={'specialization'}
					value={form.specialization}
					onChange={onChange}
				/>
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Nomor Telpon'} />
				<FormInput.TextInput name={'phone_number'} value={form.phone_number} onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Email'} />
				<FormInput.TextInput name={'email'} value={form.email} onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Alamat'} />
				<FormInput.TextArea name={'address'} value={form.address} onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Status'} />
				<FormInput.InputSelect name={'status'} value={form.status} onChange={onChange}>
					<FormInput.InputSelect.Option value={true}>Aktif</FormInput.InputSelect.Option>
					<FormInput.InputSelect.Option value={false}>Tidak Aktif</FormInput.InputSelect.Option>
				</FormInput.InputSelect>
			</FormInput>
			<div className="flex items-center justify-end gap-1.5">
				<FormInput.Button onClick={closeModal}>Batal</FormInput.Button>
				<FormInput.Button
					bgColor="lime"
					onClick={onSummit}
					disabled={isLoading || responseUpdate.isLoading}
				>
					{form.is_edit ? 'Ubah' : 'Simpan'}
				</FormInput.Button>
			</div>
		</div>
	);
};

export default Form;
