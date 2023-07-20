import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConcoctionFormState, resetForm, setForm } from '../../../redux/reducer/concoctionSlice';
import FormInput from '../../FormInput';
import InputProductUnit from './InputProductUnit';
import InputProduct from './InputProduct';
import TableProduct from './TableProduct/TableProduct';
import { setModalDialog } from '../../../redux/reducer/concoctionSlice';
import {
	useCreateConcoctionMutation,
	useUpdateConcoctionMutation,
} from '../../../redux/api/concoctionApi';
import { resetErrors, setErrors } from '../../../redux/reducer/validationSlice';
import { toastError, toastSuccess } from '../../../helper/toast';

const Form = () => {
	const dispatch = useDispatch();
	const form = useSelector(getConcoctionFormState);

	const [create, { isLoading }] = useCreateConcoctionMutation();
	const [update, responseUpdate] = useUpdateConcoctionMutation();

	const onChange = (event) => {
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value: value }));
	};

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: false }));
		dispatch(resetForm());
	};

	const onSubmit = async () => {
		console.log('form : ', form);
		// return console.log('product_concoctions : ', form.product_concoctions);
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
				toastError('Validasi Error!');
				return dispatch(setErrors(error.data.errors));
			}
			toastError(error.data.message);
		}
	};

	return (
		<div className="flex flex-col gap-1.5">
			<FormInput>
				<FormInput.Label title={'Nama Racikan'} required={true} />
				<FormInput.TextInput name={'name'} value={form.name} onChange={onChange} disabled={false} />
			</FormInput>
			<InputProductUnit />
			<FormInput>
				<FormInput.Label title={'Catatan'} />
				<FormInput.TextInput name={'note'} value={form.note} onChange={onChange} disabled={false} />
			</FormInput>
			<FormInput>
				<FormInput.Label title={'Komposisi & Dosis per Satuan'} required={true} />
				<InputProduct />
			</FormInput>
			<div className="min-h-[200px]">
				<TableProduct />
			</div>
			<div className="flex items-center justify-end gap-1.5 mt-2">
				<FormInput.Button bgColor="slate" onClick={closeModal}>
					Batal
				</FormInput.Button>
				<FormInput.Button bgColor="lime" onClick={onSubmit} disabled={isLoading}>
					Simpan
				</FormInput.Button>
			</div>
		</div>
	);
};

export default Form;
