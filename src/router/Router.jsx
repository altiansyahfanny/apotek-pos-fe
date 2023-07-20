import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import ConsignmentList from '../pages/consignment/ConsignmentList';
import Dashboard from '../pages/dashboard/Dashboard';
import AccessDenied from '../pages/error/AccessDenied';
import NotFound from '../pages/error/NotFound';
import CustomerList from '../pages/management/CustomerList';
import DoctorList from '../pages/management/DoctorList';
import SupplierList from '../pages/management/SupplierList';
import UserList from '../pages/management/UserList';
import Concoction from '../pages/prescription/Concoction';
import PrescriptionList from '../pages/prescription/PrescriptionList';
import RedeemPrescription from '../pages/prescription/RedeemPrescription';
import ExpiredDate from '../pages/productDetail/ExpiredDate';
import HistoryOpnameStock from '../pages/productDetail/HistoryOpnameStock';
import Order from '../pages/productDetail/Order';
import ProductDetail from '../pages/productDetail/ProductDetail';
import Purchase from '../pages/productDetail/Purchase';
import Sale from '../pages/productDetail/Sale';
import StockCard from '../pages/productDetail/StockCard';
import Transfer from '../pages/productDetail/Transfer';
import CreateProduct from '../pages/products/CreateProduct';
import ProductExpired from '../pages/products/ProductExpired';
import ProductList from '../pages/products/ProductList';
import Welcome from '../pages/public/Welcome';
import CreatePurchase from '../pages/purchase/CreatePurchase';
import OrderList from '../pages/purchase/OrderList';
import PurchaseList from '../pages/purchase/PurchaseList';
import PurchasePlan from '../pages/purchase/PurchasePlan';
import CreateSale from '../pages/sale/CreateSale';
import Receipt from '../pages/sale/Receipt';
import SalesList from '../pages/sale/SalesList';
import ProductUnit from '../pages/setting/ProductUnit';
import Rack from '../pages/setting/Rack';
import UpdateUserAccess from '../pages/setting/UpdateUserAccess';
import UserAccess from '../pages/setting/UserAccess';
import Warehouse from '../pages/setting/Warehouse';
import { DashLayout, ProductDetailLayout } from '../templates';
import PersistLogin from './PersistLogin';
import Prefetch from './Prefetch';
import ProtectedRoute from './ProtectedRoute';
import RequireAuth from './RequireAuth';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/login" element={<Login />} />
			<Route element={<PersistLogin />}>
				<Route element={<RequireAuth />}>
					<Route element={<Prefetch />}>
						<Route path="/dashboard" element={<DashLayout />}>
							<Route index element={<Dashboard />} />
							<Route path="products">
								<Route element={<ProtectedRoute permission={'product.read'} />}>
									<Route index element={<ProductList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'product.create'} />}>
									<Route path="create" element={<CreateProduct />} />
								</Route>
								<Route element={<ProtectedRoute permission={'product.detail'} />}>
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
								</Route>
								<Route element={<ProtectedRoute permission={'product.stock-expired.read'} />}>
									<Route path="expired" element={<ProductExpired />} />
								</Route>
							</Route>
							<Route path="prescription">
								<Route element={<ProtectedRoute permission={'prescription.read'} />}>
									<Route index element={<PrescriptionList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'prescription.redeem'} />}>
									<Route path="redeem/:id" element={<RedeemPrescription />} />
								</Route>
								<Route element={<ProtectedRoute permission={'prescription.concoction.read'} />}>
									<Route path="concoction" element={<Concoction />} />
								</Route>
							</Route>
							<Route path="sale">
								<Route element={<ProtectedRoute permission={'sale.read'} />}>
									<Route index element={<SalesList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'sale.create'} />}>
									<Route path="create" element={<CreateSale />} />
								</Route>
							</Route>
							<Route path="purchase">
								<Route element={<ProtectedRoute permission={'purchase.read'} />}>
									<Route index element={<PurchaseList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'purchase.create'} />}>
									<Route path="create" element={<CreatePurchase />} />
								</Route>
								<Route element={<ProtectedRoute permission={'purchase.plan.read'} />}>
									<Route path="plan" element={<PurchasePlan />} />
								</Route>
								<Route element={<ProtectedRoute permission={'purchase.order.read'} />}>
									<Route path="order-list" element={<OrderList />} />
								</Route>
							</Route>
							<Route path="consignment">
								<Route element={<ProtectedRoute permission={'consignment.read'} />}>
									<Route index element={<ConsignmentList />} />
								</Route>
							</Route>
							<Route path="management">
								<Route element={<ProtectedRoute permission={'management.user.read'} />}>
									<Route index element={<UserList />} />
									<Route path="user" element={<UserList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'management.customer.read'} />}>
									<Route path="customer" element={<CustomerList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'management.doctor.read'} />}>
									<Route path="doctor" element={<DoctorList />} />
								</Route>
								<Route element={<ProtectedRoute permission={'supplier.doctor.read'} />}>
									<Route path="supplier" element={<SupplierList />} />
								</Route>
							</Route>
							<Route path="setting">
								<Route element={<ProtectedRoute permission={'setting.user-access.read'} />}>
									<Route index element={<UserAccess />} />
								</Route>
								<Route path="user-access">
									<Route element={<ProtectedRoute permission={'setting.user-access.read'} />}>
										<Route index element={<UserAccess />} />
									</Route>
									<Route element={<ProtectedRoute permission={'setting.user-access.read'} />}>
										<Route path="update-user-access/:id" element={<UpdateUserAccess />} />
									</Route>
								</Route>
								<Route element={<ProtectedRoute permission={'setting.product-unit.read'} />}>
									<Route path="product-unit" element={<ProductUnit />} />
								</Route>
								<Route element={<ProtectedRoute permission={'setting.rack.read'} />}>
									<Route path="rack" element={<Rack />} />
								</Route>
								<Route element={<ProtectedRoute permission={'setting.warehouse.read'} />}>
									<Route path="warehouse" element={<Warehouse />} />
								</Route>
							</Route>
						</Route>
						<Route path="/dashboard/sale/create/receipt/:id" element={<Receipt />} />
						<Route path="/access-denied" element={<AccessDenied />} />
					</Route>
				</Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Router;
