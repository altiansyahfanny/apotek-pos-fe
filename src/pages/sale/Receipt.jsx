import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSaleByIdQuery } from '../../redux/api/saleApi';
import moment from 'moment';
import { formatThousand, formatToRupiah } from '../../helper/currency';
import { Loader } from '../../components';

const Key = ({ title = 'Key', width = 'w-5/12' }) => (
	<span className={`${width} capitalize`}>{title}</span>
);

const Colon = () => <span className="">:</span>;

const Value = ({ value = 'Value' }) => <span className="flex-1 ml-2">{value}</span>;

const KeyValueDisplay = ({ children }) => {
	return <div className="flex">{children}</div>;
};

KeyValueDisplay.Key = Key;
KeyValueDisplay.Colon = Colon;
KeyValueDisplay.Value = Value;

const DoubleBorder = () => {
	return (
		<div className="my-4">
			<div className="border-t-[1px] border-dashed border-black" />
			<div className="border-t-[1px] border-dashed border-black mt-1" />
		</div>
	);
};

const Button = ({ text, bgColor, onClick }) => {
	return (
		<div
			className={`${bgColor} text-white w-full py-1.5 text-center text-sm cursor-pointer hover:bg-opacity-90 transition rounded-sm`}
			onClick={onClick}
		>
			{text}
		</div>
	);
};
const Receipt = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const [alertIsOpen, setAlertIsOpen] = useState(true);

	const { data: SALE, isSuccess, isError, error, isLoading } = useGetSaleByIdQuery(id);

	console.log('SALE : ', SALE);

	const handlePrint = () => {
		window.print();
	};

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>Error</p>;
	if (isSuccess) {
		content = (
			<div className="grid place-content-center p-24">
				{alertIsOpen && (
					<div className="min-w-[450px] bg-emerald-500 text-white p-4 rounded-sm flex items-center justify-between mb-4 print:hidden">
						<span>Penjualan Berhasil</span>
						<div className="cursor-pointer" onClick={() => setAlertIsOpen(false)}>
							<IoCloseOutline color="#fff" size={20} />
						</div>
					</div>
				)}
				<div className="border p-4 min-w-[450px] rounded-sm">
					<div>
						<div className="text-center">
							<h1 className="text-2xl uppercase font-semibold">LHY Scarves</h1>
							<div className="text-xs mt-2">
								<h5>Lt Dasar Duta Mall Blok F No 2 Banjarmasin Country</h5>
								<h6>Telpon: 081346501057</h6>
							</div>
						</div>
						<DoubleBorder />
						<div className="text-xs">
							<KeyValueDisplay>
								<KeyValueDisplay.Key title="Nomor Penjualan" />
								<KeyValueDisplay.Colon />
								<KeyValueDisplay.Value value={SALE.reference_number} />
							</KeyValueDisplay>
							<KeyValueDisplay>
								<KeyValueDisplay.Key title="Tanggal" />
								<KeyValueDisplay.Colon />
								<KeyValueDisplay.Value value={moment(SALE.date).format('DD/MM/YYYY HH:mm')} />
							</KeyValueDisplay>
							<KeyValueDisplay>
								<KeyValueDisplay.Key title="No. Ref. Penjualan" />
								<KeyValueDisplay.Colon />
								<KeyValueDisplay.Value value={SALE.reference_number} />
							</KeyValueDisplay>
							<KeyValueDisplay>
								<KeyValueDisplay.Key title="Kasir" />
								<KeyValueDisplay.Colon />
								<KeyValueDisplay.Value value="Owner" />
							</KeyValueDisplay>
							<KeyValueDisplay>
								<KeyValueDisplay.Key title="pelanggan" />
								<KeyValueDisplay.Colon />
								<KeyValueDisplay.Value value={SALE.customer.name} />
							</KeyValueDisplay>
						</div>
						<DoubleBorder />
						<div className="text-xs flex flex-col gap-1">
							{SALE.product_sales.map((ps, index) => (
								<div key={index} className="flex items-center justify-between">
									<div>
										<p>{ps.product.name}</p>
										<p>{`${ps.qty} ${ps.product_unit.name} @ ${formatThousand(ps.price)}`}</p>
									</div>
									<span>{formatToRupiah(ps.total)}</span>
								</div>
							))}
						</div>
						<DoubleBorder />
						<div className="text-xs flex flex-col gap-1">
							<KeyValueDisplay>
								<KeyValueDisplay.Key title="Jumlah jenis barang" />
								<KeyValueDisplay.Colon />
								<KeyValueDisplay.Value value="2 Items" />
							</KeyValueDisplay>
							<div className="flex items-center justify-between">
								<span>Total</span>
								<span>15.000</span>
							</div>
							<div className="flex items-center justify-between">
								<span>DPP</span>
								<span>0</span>
							</div>
							<div className="flex items-center justify-between">
								<span>PPN</span>
								<span>0</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Tunai</span>
								<span>15.000</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Kembalian</span>
								<span>0</span>
							</div>
						</div>
						<DoubleBorder />
						<div className="uppercase text-center text-xs flex flex-col gap-4">
							<div>
								<p>barang yang sudah bibeli </p>
								<p>tidak dapat ditukar/dikembalikan</p>
							</div>
							<div>
								<p>komplain kekurangan atau salah</p>
								<p>barang maksimal 5 hari</p>
							</div>
							<p>Terima kasih</p>
						</div>
					</div>

					<div className="mt-4 flex flex-col gap-0.5 print:hidden">
						<Button text="Cetak" bgColor="bg-cyan-600" onClick={handlePrint} />
						<Button text="Kembali" bgColor="bg-amber-500" onClick={() => navigate(-1)} />
					</div>
				</div>
			</div>
		);
	}

	return content;
};

export default Receipt;
