import React from 'react';
import FormInput from '../FormInput';
import {
	getSupplierFormState,
	resetForm,
	setForm,
	setModalDialog,
} from '../../redux/reducer/supplierSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateSupplierMutation } from '../../redux/api/supplierApi';
import { resetErrors, setErrors } from '../../redux/reducer/validationSlice';
import { toastSuccess } from '../../helper/toast';

const Form = () => {
	const dispatch = useDispatch();
	const form = useSelector(getSupplierFormState);

	const [create, { isLoading }] = useCreateSupplierMutation();

	const onChange = (event) => {
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value }));
	};

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: false }));
		dispatch(resetForm());
	};

	const onSubmit = async () => {
		console.log('form : ', form);
		dispatch(resetErrors());

		try {
			const response = await create(form).unwrap();
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
				<FormInput.InputSelect value={form.status} name="address" onChange={onChange}>
					<FormInput.InputSelect.Option value={1}>Aktif</FormInput.InputSelect.Option>
					<FormInput.InputSelect.Option value={0}>Tidak Aktif</FormInput.InputSelect.Option>
				</FormInput.InputSelect>
			</FormInput>
			<div className="flex items-center justify-end gap-1.5 mt-2">
				<FormInput.Button bgColor="slate" onClick={closeModal}>
					Batal
				</FormInput.Button>
				<FormInput.Button bgColor="green" onClick={onSubmit} disabled={isLoading}>
					Simpan
				</FormInput.Button>
			</div>
		</div>
	);
};

export default Form;
