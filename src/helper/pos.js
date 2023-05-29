const countSubtotal = (products) => {
	if ([...products].length > 0) {
		return [...products].reduce(
			(accumulator, product) => accumulator + product.product_subtotal,
			0
		);
	}
	return 0;
};

export { countSubtotal };
