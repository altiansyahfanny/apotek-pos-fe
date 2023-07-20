import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatThousand } from '../../../helper/currency';
import { countSubtotal, tranformForm } from '../../../helper/pos';
import { toastError, toastSuccess } from '../../../helper/toast';
import { useCreateSaleMutation } from '../../../redux/api/saleApi';
import { getForm, resetForm, setForm } from '../../../redux/reducer/posSlice';
import { resetErrors, setErrors } from '../../../redux/reducer/validationSlice';
import InputWarehouse from '../../InputWarehouse';
import FormInput from './FormInput';
import InputCustomer from './InputCustomer';
import InputDiscount from './InputDiscount';
import InputDoctor from './InputDoctor';
import InputEmbalaseFee from './InputEmbalaseFee';
import InputSellingVia from './InputSellingVia';
import InputServiceFee from './InputServiceFee';
import InputShippingCost from './InputShippingCost';
import InputTax from './InputTax';
import PaidSaleButton from './PaidSaleButton';
import PendingSaleButton from './PendingSaleButton';

const Form = () => {
	const dispatch = useDispatch();
	const form = useSelector(getForm);
	const { date, warehouse_id } = useSelector(getForm);

	const [create, { isLoading }] = useCreateSaleMutation();

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(setForm({ key: name, value }));
	};

	const handlePending = async () => {
		const data = tranformForm(form);

		if (data.status === 3) return toastError('Sudah Penjualan Tertunda');

		// return console.log('form : ', form);

		dispatch(resetErrors());

		try {
			const response = await create({ ...data, status: 3 }).unwrap();
			toastSuccess('Penjulan Ditunda');
			dispatch(resetForm());
		} catch (error) {
			if (error.status === 422) {
				toastError('Validasi Error!');
				return dispatch(setErrors(error.data.errors));
			}
			toastError(error.data.message);
			console.log('error : ', error);
		}
	};

	return (
		<div>
			<div className="flex flex-col gap-y-4">
				<FormInput.TextInput
					label={'Subtotal (Rp)'}
					disabled={true}
					value={formatThousand(countSubtotal(form.products))}
					onChange={() => {}}
				/>
				<InputServiceFee />
				<InputEmbalaseFee />
				<InputShippingCost />
				<InputDiscount />
				<InputTax />
				<InputSellingVia />
				<FormInput.TextInput
					label={'Tanggal Transaksi'}
					inline={false}
					type="datetime-local"
					value={date}
					name={'date'}
					onChange={handleChange}
				/>
				<InputCustomer />
				<InputDoctor />
				<InputWarehouse {...{ warehouse_id, setForm }} />
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-2 gap-2">
						<FormInput.Button text={'Tunda'} bgColor="bg-emerald-500" onClick={handlePending} />
						<PaidSaleButton />
						<PendingSaleButton />
						<FormInput.Button text={'Tebus Resep'} bgColor="bg-teal-800" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;
