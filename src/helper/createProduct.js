const tranformForm = (form) => {
	const { count_price_with_margin, profit_margin, ...data } = form;
	const newForm = {
		...data,
		status: form.product_status_id == 1 ? true : false,
	};

	return newForm;
};
const tranformFormForEdit = (product) => {
	const {
		capital_price,
		price,
		alternative_prices,
		other_product_units,
		product_sales,
		product_stocks,
		product_category,
		product_status,
		rack,
		product_unit,
		stock_amount,
		total_amount_from_purchase,
		...rest
	} = product;

	const profit_margin = ((price - capital_price) / capital_price) * 100;
	const new_alternative_prices = alternative_prices.map((alternative_price) => ({
		...alternative_price,
		is_delete: false,
		is_edit: true,
	}));
	const new_other_product_units = other_product_units.map((other_product_unit) => ({
		...other_product_unit,
		is_delete: false,
		is_edit: true,
	}));

	const newForm = {
		...rest,
		price,
		capital_price,
		alternative_prices: new_alternative_prices,
		other_product_units: new_other_product_units,
		profit_margin,
		is_edit: true,
	};

	return newForm;
};

const generateSKU = (name) => {
	return name
		.split(' ')
		.map((name) => name.slice(0, 3))
		.slice(0, 3)
		.join('');
};

export { tranformForm, generateSKU, tranformFormForEdit };
