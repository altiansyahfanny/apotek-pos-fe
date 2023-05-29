import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../../redux/reducer/posSlice';
import { countSubtotal } from '../../../helper/pos';
import { formatToRupiah } from '../../../helper/currency';

const Label = ({ title }) => <label className="text-sm text-gray-700">{title}</label>;

const TextInput = ({
	label,
	inline = true,
	type = 'text',
	disabled = false,
	value,
	onChange,
	name,
}) => {
	return (
		<div className={`flex ${inline ? 'items-center' : 'flex-col gap-y-1.5'}`}>
			<div className={`${inline ? 'w-7/12' : 'w-full'}`}>
				<Label title={label} />
			</div>
			<div className={`${inline ? 'w-5/12' : 'w-full'}`}>
				<input
					className={`w-full border-2 border-gray-300 text-gray-700 text-sm rounded px-2 py-1.5 focus:outline-none focus:ring-0 focus:border-green_tea`}
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

const InputSelect = ({ children, label }) => {
	return (
		<div>
			<Label title={label} />
			<select
				className={`w-full mt-1.5 border-2 border-gray-300 text-gray-700 text-sm rounded px-2 py-1.5 focus:outline-none focus:ring-0 focus:border-green_tea`}
			>
				{children}
			</select>
		</div>
	);
};

const Button = ({ bgColor, text }) => {
	return <button className={`${bgColor} rounded  w-full p-2 text-sm text-white`}>{text}</button>;
};

const Form = () => {
	const dispatch = useDispatch();
	const { products, service_fee, embalase_fee, shipping_costs, discount } = useSelector(getForm);

	const handleChange = (e) => {
		const { value, name } = e.target;
		const tempValue = Number(value);

		if (tempValue <= 0 || Number.isNaN(tempValue)) {
			return dispatch(setForm({ key: name, value: 0 }));
		}
		dispatch(setForm({ key: name, value: Number(value) }));
	};

	return (
		<div>
			<div className="flex flex-col gap-y-4">
				<TextInput
					label={'Subtotal (Rp)'}
					disabled={true}
					value={formatToRupiah(countSubtotal(products))}
				/>
				<TextInput
					label={'Biaya Layanan (Rp)'}
					value={service_fee}
					onChange={handleChange}
					name={'service_fee'}
				/>
				<TextInput
					label={'Biaya Embalase (Rp)'}
					value={embalase_fee}
					onChange={handleChange}
					name={'embalase_fee'}
				/>
				<TextInput
					label={'Biaya Pengiriman (Rp)'}
					value={shipping_costs}
					onChange={handleChange}
					name={'shipping_costs'}
				/>
				<TextInput label={'Diskon'} value={discount} onChange={handleChange} name={'discount'} />
				<InputSelect label={'PPN (%)'}>
					<option value={0}>Tidak Dikenakan PPN</option>
					<option value={11}>11</option>
					<option value={12}>12</option>
					<option value={13}>13</option>
				</InputSelect>
				<InputSelect label={'Penjualan Via'}>
					<option value={'Offline'}>Offline</option>
					<option value={'GoApotik'}>GoApotik</option>
					<option value={'GrabHealth'}>GrabHealth</option>
					<option value={'GrabMart'}>GrabMart</option>
					<option value={'Halodoc'}>Halodoc</option>
					<option value={'KlikDokter'}>KlikDokter</option>
					<option value={'Shopee'}>Shopee</option>
					<option value={'Tiktok'}>Tiktok</option>
					<option value={'Tokopedia'}>Tokopedia</option>
					<option value={'Whatsapp'}>Whatsapp</option>
					<option value={'Lainya'}>Lainya</option>
				</InputSelect>
				<TextInput label={'Tanggal Transaksi'} inline={false} type="datetime-local" />
				<InputSelect label={'Gudang'}>
					<option value={'Gudang Utama'}>Gudang Utama</option>
					<option value={'Gudang Kelayan'}>Gudang Kelayan</option>
				</InputSelect>
				<div className="flex flex-col gap-2">
					<Button text={'Bayar'} bgColor="bg-blue-500" />
					<Button text={'Tunda'} bgColor="bg-gray-500" />
					<Button text={'Penjualan Tertunda'} bgColor="bg-orange-500" />
					<Button text={'Tebus Resep'} bgColor="bg-green_tea" />
				</div>
			</div>
		</div>
	);
};

export default Form;
