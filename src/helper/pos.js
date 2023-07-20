const countSubtotal = (products) => {
	if ([...products].length > 0) {
		return [...products].reduce(
			(accumulator, product) => accumulator + product.product_subtotal,
			0
		);
	}
	return 0;
};

const countTotal = (form) => {
	const { products, service_fee, embalase_fee, shipping_costs, discount, tax } = form;
	if ([...products].length > 0) {
		const products_price = [...products].reduce(
			(accumulator, product) => accumulator + product.product_subtotal,
			0
		);

		return (
			products_price +
			(products_price * tax) / 100 +
			service_fee +
			shipping_costs +
			embalase_fee -
			discount
		);
	}
	return 0;
};

const tranformForm = (form) => {
	const newProducts = form.products.map((product) => ({
		product_id: product.id,
		qty: product.qty,
		total_qty: product.qty * product.qty_from_product_unit,
		price: product.price,
		total: product.product_subtotal,
		product_stock_id: product.product_stock_id,
		product_unit_id: product.product_unit_id,
		price_type: product.price_type,
		is_custom_price: product.is_custom_price,
		is_pending: product.is_pending,
	}));

	const { products, warehouse_id, debt, payment_account, ...newForm } = form;

	return {
		...newForm,
		payment_account: form.status === 2 ? null : form.payment_account,
		debt: form.status === 2 ? countTotal(form) : 0,
		subtotal: countSubtotal(form.products),
		total: countTotal(form),

		products: newProducts,
	};
};

export { countSubtotal, countTotal, tranformForm };
