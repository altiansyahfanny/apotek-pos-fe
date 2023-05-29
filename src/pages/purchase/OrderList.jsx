import React, { useState } from 'react';
import { MainLayout } from '../../templates';
import { formatToRupiah } from '../../helper/currency';

const OrderList = () => {
	const [potonganHarga, setPotonganHarga] = useState('');
	const [total, setTotal] = useState(10000);
	const [totalAwal, setTotalAwal] = useState(10000);

	function onChange(event) {
		const inputPotonganHarga = event.target.value;

		if (inputPotonganHarga === '') {
			setPotonganHarga('');
			setTotal(totalAwal); // Mengembalikan total ke nilai awal dari state
			return;
		}

		const numericPotonganHarga = Number(inputPotonganHarga);
		const newTotal = totalAwal - numericPotonganHarga;
		setPotonganHarga(inputPotonganHarga);
		setTotal(newTotal);
	}

	return (
		<MainLayout title="Daftar Pesanan">
			<div className="mb-4">
				<input type="number" className="border" value={potonganHarga} onChange={onChange} />
			</div>
			<div>TOTAL : Rp. {formatToRupiah(total)}</div>
			<div>DISKON : Rp. {formatToRupiah(potonganHarga)}</div>
		</MainLayout>
	);
};

export default OrderList;
