import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getAddPurchaseFormState, setForm } from '../../redux/reducer/addPurchaseSlice';
import {
	getSupplierModalDialogState,
	resetForm,
	setModalDialog,
} from '../../redux/reducer/supplierSlice';
import FormInput from '../FormInput';
import Modal from '../Modal';
import Form from '../Supplier/Form';
import { useGetSuppliersQuery } from '../../redux/api/supplierApi';

const InputSupplier = () => {
	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);
	const modal_dialog = useSelector(getSupplierModalDialogState);

	const { data: SUPPLIERS, isLoading, isSuccess, isError, error } = useGetSuppliersQuery();

	const onChange = (e) => {
		const { name, value } = e.target;
		dispatch(setForm({ key: name, value }));
	};

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_is_open', value: false }));
		dispatch(resetForm());
	};

	let content;
	if (isSuccess) {
		content = SUPPLIERS.map((supplier, index) => (
			<FormInput.InputSelect.Option key={index} value={supplier.id}>
				{supplier.name}
			</FormInput.InputSelect.Option>
		));
	}

	return (
		<>
			<FormInput>
				<FormInput.Label title={'Supplier'} required={true} />
				<div className="flex gap-x-1.5 items-start">
					<div className="flex-1">
						<FormInput.InputSelect
							value={form.supplier_id}
							name="supplier_id"
							onChange={onChange}
							disabled={isLoading}
						>
							<FormInput.InputSelect.Option value={''}>Pilih Supplier</FormInput.InputSelect.Option>
							{content}
						</FormInput.InputSelect>
					</div>
					<FormInput.SideButton
						bgColor="bg-green_tea"
						onClick={() => dispatch(setModalDialog({ key: 'modal_add_is_open', value: true }))}
					>
						<HiOutlinePlus />
					</FormInput.SideButton>
				</div>
			</FormInput>
			<Modal
				closeModal={closeModal}
				isOpen={modal_dialog.modal_add_is_open}
				title={'Tambah Supplier'}
				width="md"
			>
				<Form />
			</Modal>
		</>
	);
};

export default InputSupplier;
