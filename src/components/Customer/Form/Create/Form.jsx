import React from 'react';
import FormInput from '../../../FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFormState, setForm } from '../../../../redux/reducer/customerSlice';
import {
	useCreateCustomerMutation,
	useUpdateCustomerMutation,
} from '../../../../redux/api/customerApi';
import { resetErrors, setErrors } from '../../../../redux/reducer/validationSlice';
import { toastError, toastSuccess } from '../../../../helper/toast';

const Form = ({ closeModal }) => {
	const dispatch = useDispatch();
	const form = useSelector(getCustomerFormState);

	const [create, { isLoading }] = useCreateCustomerMutation();
	const [update, responseUpdate] = useUpdateCustomerMutation();

	const onChange = (event) => {
		dispatch(setForm({ key: event.target.name, value: event.target.value }));
	};

	const onSummit = async () => {
		// return console.log('form : ', form);

		dispatch(resetErrors());

		try {
			let response;
			if (form.is_edit === false) {
				response = await create(form).unwrap();
			} else {
				response = await update(form).unwrap();
			}
			closeModal();
			toastSuccess(response.message);
		} catch (error) {
			if (error.status === 422) {
				toastError(error.data.message);
				return dispatch(setErrors(error.data.errors));
			}

			toastError('Terjadi Kesalahan');

			console.log('error : ', error);
		}
	};

	return (
		<div className="flex flex-col gap-1.5">
			<FormInput>
				<FormInput.Label title={'Nama Pelanggan'} required={true} />
				<FormInput.TextInput name={'name'} value={form.name} onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Kode Member'} required={true} />
				<FormInput.TextInput
					name={'member_code'}
					value={form.member_code}
					onChange={onChange}
					disabled={true}
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
				<FormInput.Label title={'Tanngal Lahir'} />
				<FormInput.TextInput
					type={'date'}
					name={'birth_date'}
					value={form.birth_date}
					onChange={onChange}
				/>
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
