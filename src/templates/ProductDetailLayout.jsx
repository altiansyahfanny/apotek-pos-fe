import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import { FilterWarehouse } from '../components';
import { useSelector } from 'react-redux';
import { getProductDetailState, setWarehouse } from '../redux/reducer/productDetailSlice';
import { FaWarehouse } from 'react-icons/fa';

const LINKS = [
	{ name: 'Rincian Produk', isActive: true, to: 'detail' },
	{ name: 'Penjualan', isActive: false, to: 'sale' },
	{ name: 'Pembelian', isActive: false, to: 'purchase' },
	{ name: 'Pesanan', isActive: false, to: 'order' },
	{ name: 'Transfer', isActive: false, to: 'transfer' },
	{ name: 'Kartu Stok', isActive: false, to: 'stock-card' },
	{ name: 'Tanggal Kadaluarga', isActive: false, to: 'expired-date' },
	{ name: 'Riwayat Stok Opname', isActive: false, to: 'history-opname-stock' },
];

const NavigationLink = ({ to, name }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				`flex-1 grid place-content-center border ${
					isActive
						? 'bg-green_tea text-white border-green_tea'
						: 'bg-white text-gray-700 hover:bg-green_tea hover:text-white'
				} text-center py-1 px-2 rounded transition`
			}
			to={`${to}`}
		>
			<span className="text-xs whitespace-nowrap">{name}</span>
		</NavLink>
	);
};

const ProductDetailLayout = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const pathnameArr = pathname.split('/');
	const lastPath = pathnameArr[pathnameArr.length - 1];
	const navigate = useNavigate();

	useEffect(() => {
		const result = LINKS.some((link) => link.to === lastPath);
		if (!result) navigate(`${pathname}/detail`);
	});

	const { warehouse_id } = useSelector(getProductDetailState);
	return (
		<MainLayout title="Rincian Produk">
			<MainLayout.Header title={'Paracetamol Kimia Farma 500mg'}>
				<FilterWarehouse value={warehouse_id} action={setWarehouse} />
			</MainLayout.Header>
			<div>
				<div className="flex items-center gap-1 mt-4 overflow-x-scroll">
					{LINKS.map(({ to, name }, index) => {
						return <NavigationLink {...{ key: index, to, name }} />;
					})}
				</div>
			</div>
			<div className="mt-2">
				<Outlet />
			</div>
		</MainLayout>
	);
};

export default ProductDetailLayout;
