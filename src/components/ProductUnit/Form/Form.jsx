import React from 'react';
import FormInput from '../../FormInput';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProductUnitFormState,
	setForm,
	resetForm,
} from '../../../redux/reducer/productUnitSlice';
import { setModalDialog } from '../../../redux/reducer/componentSlice';
import { useCreateProductUnitMutation } from '../../../redux/api/productUnitApi';
import { resetErrors, setErrors } from '../../../redux/reducer/validationSlice';
import { toastError, toastSuccess } from '../../../helper/toast';
import { RiErrorWarningLine } from 'react-icons/ri';

const Form = () => {
	const dispatch = useDispatch();
	const { name } = useSelector(getProductUnitFormState);
	const [create, { isLoading }] = useCreateProductUnitMutation();

	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(setForm({ key: name, value }));
	};

	const closeModal = () => {
		dispatch(resetForm());
		dispatch(setModalDialog({ key: 'modal_add_product_unit_is_open', value: false }));
	};

	const onSubmit = async () => {
		dispatch(resetErrors());

		try {
			const response = await create({ name }).unwrap();
			closeModal();
			toastSuccess(response.message);
		} catch (error) {
			if (error.status === 422) return dispatch(setErrors(error.data.errors));
			toastError(error.data.message);

			console.log('error : ', error);
		}
	};

	return (
		<div className="flex flex-col gap-1.5">
			<FormInput>
				<FormInput.Label title={'Nama Satuan Produk'} required={true} />
				<FormInput.TextInput name={'name'} value={name} onChange={onChange} disabled={false} />
			</FormInput>
			<div className="bg-red-100 text-red-900 p-3 rounded flex items-start gap-2">
				<div>
					<RiErrorWarningLine size={24} />
				</div>
				<p className="text-sm">
					Sebelum menambahkan satuan baru, mohon untuk dicek kembali agar tidak terjadi duplikasi
					data.
				</p>
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
