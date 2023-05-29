import React from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const List = ({ children }) => (
	<ul className="w-2/3 border divide-y rounded overflow-hidden">{children}</ul>
);
const ListItem = ({ label, value }) => (
	<li className="flex items-start gap-4 p-3 capitalize text-sm even:bg-gray-50 odd:bg-gray-100">
		<div className="flex-1 text-right">{label}</div>
		<div className="text-center">:</div>
		<div className="flex-1 text-left">{value}</div>
	</li>
);

const ProductDetail = () => {
	return (
		<div className="flex items-start gap-4">
			<List>
				<ListItem label={'Nama Produk'} value={'Paracetamol Kimia Farma 500mg'} />
				<ListItem label={'SKU'} value={'PARKIM500'} />
				<ListItem label={'Kategori'} value={'Obat'} />
				<ListItem label={'supplier'} value={'Kimia Farma'} />
				<ListItem label={'harga beli'} value={'Rp. 30.000,00,-'} />
				<ListItem label={'harga jual'} value={'Rp. 20.000 - 15.000 - 18.000'} />
				<ListItem label={'Stok'} value={'50'} />
				<ListItem label={'Batch'} value={'1'} />
				<ListItem label={'Peringatan Kuantitas'} value={'10'} />
				<ListItem label={'Rak'} value={'-'} />
				<ListItem label={'Zat'} value={'-'} />
				<ListItem label={'Bentuk & Kekuatan Sedian'} value={'-'} />
				<ListItem label={'Status'} value={'Dijual'} />
				<ListItem label={'Gudang'} value={'Semua Gudang'} />
				<ListItem
					label={'Informasi Lainnya'}
					value={'Hati-hati pada penderita penyakit ginjal. Dapat meningkatkan...'}
				/>
			</List>
			<div className="w-1/3 border p-4 flex flex-col items-center gap-y-4 rounded">
				<QRCode value="https://example.com" size={200} />
				<Barcode value="1 34265 46243 9" fontSize={16} width={1.5} height={80} />
			</div>
		</div>
	);
};

export default ProductDetail;
