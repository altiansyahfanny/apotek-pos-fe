import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConsignmentList from './pages/consignment/ConsignmentList';
import Dashboard from './pages/dashboard/Dashboard';
import CustomerList from './pages/management/CustomerList';
import DoctorList from './pages/management/DoctorList';
import SupplierList from './pages/management/SupplierList';
import UserList from './pages/management/UserList';
import Concoction from './pages/prescription/Concoction';
import PrescriptionList from './pages/prescription/PrescriptionList';
import ExpiredDate from './pages/productDetail/ExpiredDate';
import HistoryOpnameStock from './pages/productDetail/HistoryOpnameStock';
import Order from './pages/productDetail/Order';
import ProductDetail from './pages/productDetail/ProductDetail';
import Purchase from './pages/productDetail/Purchase';
import Sale from './pages/productDetail/Sale';
import StockCard from './pages/productDetail/StockCard';
import Transfer from './pages/productDetail/Transfer';
import CreateProduct from './pages/products/CreateProduct';
import ProductExpired from './pages/products/ProductExpired';
import ProductList from './pages/products/ProductList';
import CreatePurchase from './pages/purchase/CreatePurchase';
import OrderList from './pages/purchase/OrderList';
import PurchaseList from './pages/purchase/PurchaseList';
import PurchasePlan from './pages/purchase/PurchasePlan';
import CreateSale from './pages/sale/CreateSale';
import SalesList from './pages/sale/SalesList';
import ProductUnit from './pages/setting/ProductUnit';
import Rack from './pages/setting/Rack';
import UserAccess from './pages/setting/UserAccess';
import Warehouse from './pages/setting/Warehouse';
import { DashLayout, ProductDetailLayout } from './templates';
import TriggerClass from './components/TriggerClass';

const Home = () => {
	return (
		<Link to={'dashboard'}>
			<div>Goto Dashboard</div>
		</Link>
	);
};

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<DashLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="products">
					<Route index element={<ProductList />} />
					<Route path="create" element={<CreateProduct />} />
					<Route path=":id" element={<ProductDetailLayout />}>
						<Route path="detail" element={<ProductDetail />} />
						<Route path="sale" element={<Sale />} />
						<Route path="purchase" element={<Purchase />} />
						<Route path="order" element={<Order />} />
						<Route path="transfer" element={<Transfer />} />
						<Route path="stock-card" element={<StockCard />} />
						<Route path="expired-date" element={<ExpiredDate />} />
						<Route path="history-opname-stock" element={<HistoryOpnameStock />} />
					</Route>
					<Route path="expired" element={<ProductExpired />} />
				</Route>
				<Route path="prescription">
					<Route index element={<PrescriptionList />} />
					<Route path="concoction" element={<Concoction />} />
				</Route>
				<Route path="sale">
					<Route index element={<SalesList />} />
					<Route path="create" element={<CreateSale />} />
				</Route>
				<Route path="purchase">
					<Route index element={<PurchaseList />} />
					<Route path="create" element={<CreatePurchase />} />
					<Route path="plan" element={<PurchasePlan />} />
					<Route path="order-list" element={<OrderList />} />
				</Route>
				<Route path="consignment">
					<Route index element={<ConsignmentList />} />
				</Route>
				<Route path="management">
					<Route index element={<UserList />} />
					<Route path="user" element={<UserList />} />
					<Route path="customer" element={<CustomerList />} />
					<Route path="doctor" element={<DoctorList />} />
					<Route path="supplier" element={<SupplierList />} />
				</Route>
				<Route path="setting">
					<Route index element={<UserAccess />} />
					<Route path="user-access" element={<UserAccess />} />
					<Route path="product-unit" element={<ProductUnit />} />
					<Route path="rack" element={<Rack />} />
					<Route path="warehouse" element={<Warehouse />} />
				</Route>
			</Route>
		</Routes>
	);
};

const App = () => {
	return (
		<>
			<Router />
			<ToastContainer
				autoClose={3000}
				position="top-right"
				pauseOnHover={false}
				pauseOnFocusLoss={false}
			/>
			<TriggerClass />
		</>
	);
};

export default App;
