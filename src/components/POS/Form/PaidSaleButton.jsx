import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatThousand, formatToRupiah } from '../../../helper/currency';
import { preventCharactersOtherThanNumbers } from '../../../helper/form';
import { countTotal, tranformForm } from '../../../helper/pos';
import { toastError, toastSuccess } from '../../../helper/toast';
import { useCreateSaleMutation, useUpdatePendingSaleMutation } from '../../../redux/api/saleApi';
import {
	getForm,
	getPosModalDialogState,
	resetForm,
	setForm,
	setModalDialog,
} from '../../../redux/reducer/posSlice';
import { resetErrors, setErrors } from '../../../redux/reducer/validationSlice';
import FormInputComp from '../../FormInput';
import Modal from '../../Modal';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';

const PAYMENT_ACCOUNTS = [
	'Cash',
	'QRIS',
	'Dana',
	'Gopay',
	'ShoppePay',
	'OVO',
	'BCA',
	'BRI',
	'BNI',
	'BSI',
	'Bank Mandiri',
];

const PaidSaleButton = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector(getForm);
	const { status, due_date } = useSelector(getForm);

	const { modal_paid_is_open } = useSelector(getPosModalDialogState);

	const [create, responseCreateSale] = useCreateSaleMutation();
	const [updatePendingSale, responseCreatePendingSale] = useUpdatePendingSaleMutation();

	const [payAmount, setPayAmount] = useState(0);
	const [change, setChange] = useState(0);
	const [printStruck, setPrintStruck] = useState(true);

	const total = countTotal(form);

	const validasi = () => {
		if (payAmount < total && status !== 2) {
			toastError('Uang tidak cukup!');
			return false;
		}

		return true;
	};

	const onSubmit = async () => {
		if (!validasi()) return;

		// return console.log('form : ', tranformForm(form));
		dispatch(resetErrors());
		const data = tranformForm(form);

		try {
			let response;

			if (data.status === 3) {
				// jika dari pending
				response = await updatePendingSale({ ...data, status: 1 }).unwrap();
			} else {
				response = await create(data).unwrap();
			}
			toastSuccess(response.message);
			dispatch(resetForm());
			closeModal();

			// console.log('response : ', response);

			if (printStruck) return navigate(`receipt/${response.data.id}`);
		} catch (error) {
			console.log('error : ', error);

			if (error.status === 422) {
				toastError('Validasi Error!');
				return dispatch(setErrors(error.data.errors));
			}
			toastError(error.data.message);
		}
	};

	const handleClick = () => {
		if (form.products.length < 1) return toastError('Produk kosong!');
		if (total <= 0) return toastError('Harga produk kosong!');

		dispatch(setModalDialog({ key: 'modal_paid_is_open', value: true }));
	};

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_paid_is_open', value: false }));
		setPayAmount(0);
		setChange(0);
		setPrintStruck(true);
	};

	const handleChangePayAmount = (e) => {
		preventCharactersOtherThanNumbers(e);
		const value = Number(e.target.value);

		setPayAmount(value);
		setChange(() => (value - total > 0 ? value - total : 0));

		if (value >= total) {
			dispatch(setForm({ key: 'total_paid', value: total }));
			dispatch(setForm({ key: 'debt', value: 0 }));
		}
	};

	const handleChangePaymentMethod = (e) => {
		const value = e.target.value;
		dispatch(setForm({ key: 'payment_method', value }));
		if (value === 'Kredit') {
			dispatch(setForm({ key: 'status', value: 2 }));
		} else {
			dispatch(setForm({ key: 'status', value: 1 }));
		}
	};
	return (
		<>
			<FormInput.Button text={'Bayar'} bgColor="bg-sky-500" onClick={handleClick} />
			<Modal isOpen={modal_paid_is_open} closeModal={closeModal} title={'Pembayaran'} width="lg">
				<div className="flex items-center text-gray-700 border-b pb-4">
					<div className="flex-1 text-center ">
						<p className=" font-semibold uppercase">Total Items</p>
						<p className="text-3xl">{form.products.length}</p>
					</div>
					<div className="flex-1 text-center">
						<p className=" font-semibold uppercase">Total Bayar</p>
						<p className="text-3xl text-red-600">{formatToRupiah(total)}</p>
					</div>
				</div>

				<div className="mt-4 flex flex-col gap-y-2">
					<FormInput.InputSelect
						label={'Jenis Pembayaran'}
						value={form.payment_method}
						onChange={handleChangePaymentMethod}
					>
						<option value={'Tunai'}>Tunai</option>
						<option value={'Kredit'}>Kredit</option>
					</FormInput.InputSelect>

					{status !== 2 && (
						<>
							<FormInput.InputSelect
								label={'Akun Pembayaran'}
								value={form.payment_account}
								onChange={(e) => {
									dispatch(setForm({ key: 'payment_account', value: e.target.value }));
								}}
							>
								{PAYMENT_ACCOUNTS.map((payment_account, index) => (
									<option key={index}>{payment_account}</option>
								))}
							</FormInput.InputSelect>
							<FormInput.TextInput
								label={'Jumlah Bayar'}
								value={formatThousand(payAmount)}
								onChange={handleChangePayAmount}
							/>
						</>
					)}
					{status === 2 && (
						<FormInput.TextInput
							type="date"
							label={'Jatuh Tempo Pembayaran'}
							name={'due_date'}
							value={due_date}
							onChange={(e) => dispatch(setForm({ key: 'due_date', value: e.target.value }))}
						/>
					)}
					<FormInput.TextInput
						label={'Catatan'}
						value={form.notes}
						onChange={(e) => {
							dispatch(setForm({ key: 'notes', value: e.target.value }));
						}}
					/>
				</div>

				{status === 1 && (
					<div className="mt-12">
						<div className="flex-1 text-center ">
							<p className=" font-semibold uppercase">Kembalian</p>
							<p className="text-3xl text-red-600">{formatToRupiah(change)}</p>
						</div>
					</div>
				)}

				<hr className="my-8" />

				<div className="flex items-center justify-between">
					<FormInput.Checkbox
						value={''}
						label={'Cetak Struk'}
						checked={printStruck}
						onChange={() => setPrintStruck(!printStruck)}
					/>
					<div className="flex items-center gap-2">
						<FormInputComp.Button bgColor="slate" onClick={closeModal}>
							Batal
						</FormInputComp.Button>
						<FormInputComp.Button
							bgColor="lime"
							onClick={onSubmit}
							disabled={responseCreateSale.isLoading || responseCreatePendingSale.isLoading}
							// disabled={true}
						>
							Bayar
						</FormInputComp.Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default PaidSaleButton;
