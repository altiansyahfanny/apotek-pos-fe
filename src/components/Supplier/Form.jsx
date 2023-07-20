import React from 'react';
import FormInput from '../FormInput';
import {
	getSupplierFormState,
	resetForm,
	setForm,
	setModalDialog,
} from '../../redux/reducer/supplierSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateSupplierMutation, useUpdateSupplierMutation } from '../../redux/api/supplierApi';
import { resetErrors, setErrors } from '../../redux/reducer/validationSlice';
import { toastSuccess } from '../../helper/toast';

const Form = ({ closeModal }) => {
	const dispatch = useDispatch();
	const form = useSelector(getSupplierFormState);

	const [create, { isLoading }] = useCreateSupplierMutation();
	const [update, responseUpdate] = useUpdateSupplierMutation();

	const onChange = (event) => {
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value }));
	};

	const onSubmit = async () => {
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
			if (error.status === 422) return dispatch(setErrors(error.data.errors));
			// toastError(error.data.message);

			console.log('error : ', error);
		}
	};
	return (
		<div className="flex flex-col gap-1.5">
			<FormInput>
				<FormInput.Label title={'Nama Supplier'} required={true} />
				<FormInput.TextInput value={form.name} name="name" onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Email'} required={true} />
				<FormInput.TextInput value={form.email} name="email" onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Nomor Telepon'} required={true} />
				<FormInput.TextInput value={form.phone_number} name="phone_number" onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Alamat'} required={true} />
				<FormInput.TextArea value={form.address} name="address" onChange={onChange} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Status'} required={true} />
				<FormInput.InputSelect value={form.status} name="status" onChange={onChange}>
					<FormInput.InputSelect.Option value={true}>Aktif</FormInput.InputSelect.Option>
					<FormInput.InputSelect.Option value={false}>Tidak Aktif</FormInput.InputSelect.Option>
				</FormInput.InputSelect>
			</FormInput>
			<div className="flex items-center justify-end gap-1.5 mt-2">
				<FormInput.Button bgColor="slate" onClick={closeModal}>
					Batal
				</FormInput.Button>
				<FormInput.Button
					bgColor="lime"
					onClick={onSubmit}
					disabled={isLoading || responseUpdate.isLoading}
				>
					{form.is_edit ? 'Ubah' : 'Simpan'}
				</FormInput.Button>
			</div>
		</div>
	);
};

export default Form;
