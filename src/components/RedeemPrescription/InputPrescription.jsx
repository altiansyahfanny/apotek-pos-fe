import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatToRupiah } from '../../helper/currency';
import { countSubtotal } from '../../helper/pos';
import { getPrescriptionFormState } from '../../redux/reducer/prescriptionSlice';
import FormInput from '../FormInput';
import InputProducts from './TableProduct/InputProducts';
import TableProduct from './TableProduct/TableProduct';
import InputConcoction from './TableProduct/InputConcoction';
import { useNavigate } from 'react-router-dom';

const Button = ({ bgColor, text, onClick }) => {
	return (
		<button
			className={`${bgColor} rounded  w-full px-3 py-2 text-xs font-semibold text-white tracking-wide focus:outline-none`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

const InputPrescription = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { prescription_details, doctor, customer, product_prescriptions } =
		useSelector(getPrescriptionFormState);

	const onCancel = () => {
		navigate(-1);
	};

	return (
		<div className="border-t mt-4">
			<div className="flex gap-x-4 mt-4">
				<div className="w-1/4 ">
					<div className="bg-white shadow p-4 rounded border-t">
						<div className="text-gray-500 text-xs font-semibold">
							<div className="flex">
								<span className="w-1/3">Nama Dokter</span>
								<span className="">:</span>
								<span className="flex-1 ml-2">{doctor.name}</span>
							</div>
							<div className="flex">
								<span className="w-1/3">No. SIP</span>
								<span className="">:</span>
								<span className="flex-1 ml-2">{doctor.sip}</span>
							</div>
						</div>
						<hr className="my-4 " />
						<div className="flex flex-col gap-2">
							{prescription_details.map((prescription_content, index) => (
								<div key={index} className="flex items-start gap-2">
									<span className="text-gray-500 font-semibold text-sm">R/</span>
									<div className="flex-1">
										<FormInput>
											<FormInput.TextArea
												value={prescription_content.content}
												onChange={() => {}}
											/>
										</FormInput>
									</div>
								</div>
							))}
						</div>
						<hr className="my-4 " />
						<div className="text-gray-500 text-xs font-semibold">
							<div className="flex">
								<span className="w-1/3">Nama Pasien</span>
								<span className="">:</span>
								<span className="flex-1 ml-2">{customer.name}</span>
							</div>
							<div className="flex">
								<span className="w-1/3">Umur</span>
								<span className="">:</span>
								<span className="flex-1 ml-2">{customer.age ?? 0} tahun</span>
							</div>
							<div className="flex">
								<span className="w-1/3">Alamat</span>
								<span className="">:</span>
								<span className="flex-1 ml-2">{customer.address}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="w-3/4 flex flex-col gap-2">
					<div className="grid grid-cols-2 gap-2">
						<InputProducts />
						<InputConcoction />
					</div>
					<div className="flex-1">
						<TableProduct />
					</div>
					{product_prescriptions && product_prescriptions.length > 0 && (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Button bgColor={'bg-slate-500'} onClick={onCancel} text={'Batal'} />
								<Button bgColor={'bg-lime-500'} onClick={() => {}} text={'Simpan'} />
							</div>
							<h1 className="text-3xl text-gray-700 font-semibold">
								{formatToRupiah(countSubtotal(product_prescriptions))}
							</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InputPrescription;
