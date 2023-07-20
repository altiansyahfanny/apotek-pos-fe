import { combineReducers } from 'redux';
import productSlice from './reducer/productSlice';
import prescriptionSlice from './reducer/prescriptionSlice';
import productExpiredSlice from './reducer/productExpiredSlice';
import concoctionSlice from './reducer/concoctionSlice';
import saleSlice from './reducer/saleSlice';
import purchaseSlice from './reducer/purchaseSlice';
import consignmentSlice from './reducer/consignmentSlice';
import userSlice from './reducer/userSlice';
import customerSlice from './reducer/customerSlice';
import doctorSlice from './reducer/doctorSlice';
import supplierSlice from './reducer/supplierSlice';
import userAccessSlice from './reducer/userAccessSlice';
import productUnitSlice from './reducer/productUnitSlice';
import rackSlice from './reducer/rackSlice';
import warehouseSlice from './reducer/warehouseSlice';
import productDetailSlice from './reducer/productDetailSlice';
import posSlice from './reducer/posSlice';
import addProductSlice from './reducer/addProductSlice';
import addPurchaseSlice from './reducer/addPurchaseSlice';
import { apiSlice } from './api/apiSlice';
import validationSlice from './reducer/validationSlice';
import formInputSlice from './reducer/formInputSlice';
import componentSlice from './reducer/componentSlice';
import productPurchaseSlice from './reducer/productPurchaseSlice';
import productSaleSlice from './reducer/productSaleSlice';
import authSlice from './reducer/authSlice';

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authSlice,
	component: componentSlice,
	product: productSlice,
	add_product: addProductSlice,
	product_expired: productExpiredSlice,
	product_detail: productDetailSlice,
	product_purchase: productPurchaseSlice,
	product_sale: productSaleSlice,
	prescription: prescriptionSlice,
	concoction: concoctionSlice,
	sale: saleSlice,
	purchase: purchaseSlice,
	consignment: consignmentSlice,
	customer: customerSlice,
	doctor: doctorSlice,
	user: userSlice,
	supplier: supplierSlice,
	user_access: userAccessSlice,
	product_unit: productUnitSlice,
	rack: rackSlice,
	warehouse: warehouseSlice,
	pos: posSlice,
	add_purchase: addPurchaseSlice,
	validation: validationSlice,
	form_input: formInputSlice,
});

export default rootReducer;
