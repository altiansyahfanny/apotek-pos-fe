const calculateQty = (qty, qty_from_product_unit) => {
	return qty * qty_from_product_unit;
};
const calculateCashback = (cashback, cashback_with_percen, product_purchase_price) => {
	if (cashback_with_percen) {
		return (product_purchase_price * cashback) / 100;
	}
	return cashback;
};
const calculateProductPrice = (product_purchase_price, cashback, tax, tax_category) => {
	if (tax_category == 2) {
		return Number(
			product_purchase_price - cashback + ((product_purchase_price - cashback) * tax) / 100
		).toFixed(2);
		// return Math.round(
		// 	product_purchase_price - cashback + ((product_purchase_price - cashback) * tax) / 100
		// );
	}
	return Number(product_purchase_price - cashback).toFixed(2);
	// return Math.round(product_purchase_price - cashback);
};
const calculateSubtotal = (total_qty, product_price) => {
	return Number(total_qty * product_price).toFixed(2);
	// return Math.round(total_qty * product_price);
};

const tranformForm = (form) => {
	// console.log('form : ', form);

	const products = form.products;
	const newProducts = products.map((product) => {
		return {
			product_id: product.product_id,
			batch_number: product.batch_number,
			expired_date: product.expired_date,
			product_unit_id: product.product_unit_id,
			total_amount: product.subtotal,
			product_purchase_price: product.product_purchase_price,
			qty: product.qty * product.qty_from_product_unit,
		};
	});
	const newForm = {
		warehouse_id: form.warehouse_id,
		supplier_id: form.supplier_id,
		invoice_number: form.invoice_number,
		order_letter_number: form.order_letter_number,
		date: form.date,
		receipt_date: form.receipt_date,
		total_amount: form.total_amount,
		payment_method: form.payment_method,
		payment_status: form.payment_status,
		// payment_account: form.payment_account,
		due_date: form.due_date,
		tax_category: form.tax_category,
		tax: form.tax, // tax dalam persen (%), bukan tax dari total harga
		cashback: form.cashback,
		other_cost: form.other_cost,
		// file_name: form.file_name,
		products: newProducts,
	};

	return newForm;
};

export { calculateProductPrice, calculateQty, calculateSubtotal, tranformForm, calculateCashback };
