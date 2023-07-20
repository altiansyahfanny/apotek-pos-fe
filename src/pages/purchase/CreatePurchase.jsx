import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../components';
import InputTax from '../../components/CreatePurchase/InputTax';
import TableProduct from '../../components/CreatePurchase/TableProduct';
import TableTotal from '../../components/CreatePurchase/TableTotal';
import { PAYMENT_ACCOUNTS, SUPPLIERS, WAREHOUSES } from '../../data';
import { tranformForm } from '../../helper/createPurchase';
import { formatToRupiah, formatThousand } from '../../helper/currency';
import { toastError, toastSuccess } from '../../helper/toast';
import { useCreateInvoiceMutation } from '../../redux/api/invoiceApi';
import { getAddPurchaseFormState, resetForm, setForm } from '../../redux/reducer/addPurchaseSlice';
import { resetErrors, setErrors } from '../../redux/reducer/validationSlice';
import { MainLayout } from '../../templates';
import { HiOutlinePlus } from 'react-icons/hi';
import InputSupplier from '../../components/CreatePurchase/InputSupplier';

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

const CreatePurchase = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector(getAddPurchaseFormState);
	const [file, setFile] = useState('');

	const onChange = (e) => {
		const { name, value } = e.target;

		if (name === 'payment_method') {
			dispatch(setForm({ key: 'payment_account', value: '' }));
			dispatch(setForm({ key: 'due_date', value: '' }));
		}
		dispatch(setForm({ key: name, value }));
	};

	const onChangeNumber = (e) => {
		preventCharactersOtherThanNumbers(e);
		const { name, value } = e.target;
		dispatch(setForm({ key: name, value: Number(value) }));
	};

	const onFileUpload = (e) => {
		const file = e.target.files[0];
		setFile(file);
		dispatch(setForm({ key: 'file_name', value: file.name }));
	};

	const disabledDueDate = form.payment_method === 'Tunai' || form.payment_method === '';
	const disabledPaymentAccount = form.payment_method === 'Kredit' || form.payment_method === '';

	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		if ([...form.products].length > 0) {
			const total_price = [...form.products].reduce(
				(prev, product) => prev + Number(product.subtotal),
				0
			);
			setTotalPrice(total_price - form.cashback + form.other_cost);
		} else {
			setTotalPrice(0);
		}
	}, [form]);

	const [create, { isLoading }] = useCreateInvoiceMutation();

	const handleSubmit = async () => {
		dispatch(resetErrors());
		const data = { ...tranformForm(form), total_amount: totalPrice };

		console.log('data : ', data);
		// return;

		try {
			const response = await create(data).unwrap();

			navigate('/dashboard/purchase', { replace: true });
			toastSuccess(response.message);
			dispatch(resetForm());
		} catch (error) {
			if (error.status === 422) {
				toastError('Validasi Error!');
				return dispatch(setErrors(error.data.errors));
			}
			toastError(error.data.message);
		}
	};

	return (
		<MainLayout title="Tambah Pembelian">
			<div className="grid grid-cols-3 gap-4">
				<FormInput>
					<FormInput.Label title={'Nomor Surat Pesanan'} required={true} />
					<FormInput.TextInput
						type="text"
						value={form.order_letter_number}
						name="order_letter_number"
						onChange={onChange}
					/>
				</FormInput>
				<InputSupplier />
				<FormInput>
					<FormInput.Label title={'Jenis Pembayaran'} required={true} />
					<FormInput.InputSelect
						value={form.payment_method}
						name="payment_method"
						onChange={onChange}
					>
						<FormInput.InputSelect.Option value={''}>
							Pilih Jenis Pembayaran
						</FormInput.InputSelect.Option>
						<FormInput.InputSelect.Option value={'Tunai'}>Tunai</FormInput.InputSelect.Option>
						<FormInput.InputSelect.Option value={'Kredit'}>Kredit</FormInput.InputSelect.Option>
					</FormInput.InputSelect>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Nomor Faktur'} required={true} />
					<FormInput.TextInput
						type="text"
						value={form.invoice_number}
						name="invoice_number"
						onChange={onChange}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Tanggal Terima Barang'} required={true} />
					<FormInput.TextInput
						type={'date'}
						value={form.receipt_date}
						name="receipt_date"
						onChange={onChange}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Akun Pembayaran'} required={false} />
					<FormInput.InputSelect
						disabled={disabledPaymentAccount}
						name={'payment_account'}
						value={form.payment_account}
						onChange={onChange}
					>
						<FormInput.InputSelect.Option value={''}>
							Pilih Akun Pembayaran
						</FormInput.InputSelect.Option>
						{PAYMENT_ACCOUNTS.map((payment_account, index) => (
							<FormInput.InputSelect.Option key={index} value={payment_account.name}>
								{payment_account.name}
							</FormInput.InputSelect.Option>
						))}
					</FormInput.InputSelect>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Tanggal Faktur'} required={true} />
					<FormInput.TextInput
						type={'datetime-local'}
						value={form.date}
						name="date"
						onChange={onChange}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Gudang Penerima Barang'} required={true} />
					<FormInput.InputSelect value={form.warehouse_id} name="warehouse_id" onChange={onChange}>
						<FormInput.InputSelect.Option value={''}>Pilih Gudang</FormInput.InputSelect.Option>
						{WAREHOUSES.map((warehouse, index) => (
							<FormInput.InputSelect.Option key={index} value={warehouse.id}>
								{warehouse.name}
							</FormInput.InputSelect.Option>
						))}
					</FormInput.InputSelect>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Jatuh Tempo Pembayaran'} />
					<FormInput.TextInput
						type={'date'}
						value={form.due_date}
						name="due_date"
						onChange={onChange}
						disabled={disabledDueDate}
					/>
				</FormInput>
				<InputTax />
				<FormInput>
					<FormInput.Label title={'Cashback/Diskon'} required={false} />
					<FormInput.TextInput
						type={'text'}
						value={formatThousand(form.cashback)}
						name="cashback"
						onChange={onChangeNumber}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label title={'Biaya Lainnya'} required={false} />
					<FormInput.TextInput
						type={'text'}
						value={formatThousand(form.other_cost)}
						name="other_cost"
						onChange={onChangeNumber}
					/>
				</FormInput>
				<>
					<FormInput>
						<FormInput.Label title={'Unggah Dokumen'} />
						<FormInput.InputFile
							file_name={form.file_name}
							onFileUpload={onFileUpload}
							accept={'.pdf'}
						/>
					</FormInput>
				</>
			</div>
			<hr className="my-8" />
			<div className="">
				<TableProduct />
			</div>
			<hr className="my-8" />
			<div className="grid grid-cols-2">
				<TableTotal />
				<div className="grid place-content-center">
					<span className="font-semibold text-3xl text-gray-700">
						Total {formatToRupiah(totalPrice)}
					</span>
				</div>
			</div>
			<hr className="my-8" />
			<div className="flex justify-end">
				<button
					className="bg-lime-500 text-sm text-white px-5 py-1.5 rounded hover:bg-primary transition"
					onClick={handleSubmit}
				>
					Simpan
				</button>
			</div>
		</MainLayout>
	);
};

export default CreatePurchase;
