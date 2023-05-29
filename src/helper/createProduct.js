const tranformForm = (form) => {
	const newForm = {
		supplier_id: form.supplier_id,
		product_category_id: form.product_category_id,
		product_unit_id: form.product_unit_id,
		rack_id: form.rack_id,
		product_status_id: form.product_status_id,
		minimum_stock: form.minimum_stock,
		capital_price: form.capital_price,
		price: form.price,
		name: form.name,
		sku_code: form.sku_code,
		barcode: form.barcode,
		active_substance: form.active_substance,
		other_information: form.other_information,
		alternative_prices: form.alternative_prices,
		other_product_units: form.other_product_units,
	};

	return newForm;
};

export { tranformForm };
