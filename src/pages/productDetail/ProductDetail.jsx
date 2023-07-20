import Tippy from '@tippyjs/react';
import React from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import 'tippy.js/dist/tippy.css'; // optional
import { Loader } from '../../components';
import { formatToRupiah } from '../../helper/currency';
import { useGetProductByIdQuery } from '../../redux/api/productApi';

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
	const { id } = useParams();
	const { data: product, isError, error, isLoading, isSuccess } = useGetProductByIdQuery(id);
	console.log('product : ', product);

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) {
		content = (
			<div className="flex items-start gap-4">
				<List>
					<ListItem label={'Nama Produk'} value={product.name} />
					<ListItem label={'SKU'} value={product.sku_code} />
					<ListItem label={'Kategori'} value={product.product_category.name} />
					<ListItem label={'supplier'} value={product.factory_name} />
					<ListItem label={'harga beli'} value={formatToRupiah(product.capital_price)} />
					<ListItem
						label={'harga jual'}
						value={
							<div className="flex flex-col items-start">
								<Tippy content="Harga Utama" disabled={false} className="text-center block">
									<span className="cursor-pointer text-right">{formatToRupiah(product.price)}</span>
								</Tippy>
								{product.alternative_prices.map((alternative_prices, index) => (
									<Tippy
										key={index}
										content={`${alternative_prices.alternative_price_category.name} \u2265 ${alternative_prices.minimum_item} item`}
										disabled={false}
									>
										<span className="cursor-pointer text-right">
											{formatToRupiah(alternative_prices.price)}
										</span>
									</Tippy>
								))}
							</div>
						}
					/>
					<ListItem label={'Stok'} value={product.stock_amount} />
					<ListItem
						label={'Batch'}
						value={product.purchases.map((purchase, index) => (
							<p key={index}>{purchase.batch_number}</p>
						))}
					/>
					<ListItem label={'Peringatan Kuantitas'} value={product.minimum_stock} />
					<ListItem label={'Rak'} value={product?.rack?.name ?? '-'} />
					<ListItem label={'Zat'} value={product.active_substance ?? '-'} />
					<ListItem label={'Bentuk & Kekuatan Sedian'} value={'(b)'} />
					<ListItem label={'Status'} value={product.status ? 'Dijual' : 'Tidak Dijual'} />
					<ListItem label={'Gudang'} value={product?.rack?.warehouse?.name ?? '-'} />
					<ListItem label={'Informasi Lainnya'} value={product.other_information ?? '-'} />
				</List>
				<div className="w-1/3 border p-4 flex flex-col items-center gap-y-4 rounded">
					<QRCode value="https://example.com" size={200} />
					<Barcode value="1 34265 46243 9" fontSize={16} width={1.5} height={80} />
				</div>
			</div>
		);
	}

	return content;
};

export default ProductDetail;
