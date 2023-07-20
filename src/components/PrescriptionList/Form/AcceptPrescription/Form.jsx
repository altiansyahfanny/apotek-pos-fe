import React from 'react';
import InputCustomer from './InputCustomer';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPrescriptionFormState,
	resetForm,
	setForm,
	setModalDialog,
} from '../../../../redux/reducer/prescriptionSlice';
import FormInput from '../../../FormInput';
import InputWarehouse from './InputWarehouse';
import InputDoctor from './InputDoctor';
import InputPrescription from './InputPrescription';
import { resetErrors, setErrors } from '../../../../redux/reducer/validationSlice';
import { toastError, toastSuccess } from '../../../../helper/toast';
import {
	useCreatePrescriptionMutation,
	useUpdatePrescriptionMutation,
} from '../../../../redux/api/prescriptionApi';

const Form = () => {
	const dispatch = useDispatch();
	const form = useSelector(getPrescriptionFormState);

	const [create, responseCreate] = useCreatePrescriptionMutation();
	const [update, responseUpdate] = useUpdatePrescriptionMutation();

	const onChange = (event) => {
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value: value }));
	};

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_accept_is_open', value: false }));
		dispatch(resetForm());
	};

	const onSummit = async () => {
		// return console.log('form : ', form);

		dispatch(resetErrors());

		try {
			let response;

			if (!form.is_edit) {
				response = await create({ ...form, total: 0, total_paid: 0 }).unwrap();
			} else {
				response = await update(form).unwrap();
			}
			closeModal();
			toastSuccess(response.message);
		} catch (error) {
			console.log('error : ', error);

			if (error.status === 422) {
				toastError(error.data.message);
				return dispatch(setErrors(error.data.errors));
			}

			toastError('Terjadi Kesalahan');
		}
	};

	return (
		<div className="flex flex-col gap-1.5">
			<InputWarehouse />
			<FormInput>
				<FormInput.Label title={'Kode Resep'} required={true} />
				<FormInput.TextInput name={'code'} value={form.code} onChange={onChange} disabled={true} />
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
			<InputCustomer />
			<InputDoctor />
			<FormInput>
				<FormInput.Label title={'Catatan'} required={false} />
				<FormInput.TextArea name={'note'} value={form.note} onChange={onChange} />
			</FormInput>
			<InputPrescription />
			<div className="flex items-center justify-end gap-1.5">
				<FormInput.Button onClick={closeModal}>Batal</FormInput.Button>
				<FormInput.Button
					bgColor="lime"
					onClick={onSummit}
					disabled={responseCreate.isLoading || responseUpdate.isLoading}
				>
					{form.is_edit ? 'Ubah' : 'Simpan'}
				</FormInput.Button>
			</div>
		</div>
	);
};

export default Form;
