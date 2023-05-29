const formatToRupiah = (amount) => {
	return new Intl.NumberFormat('id-ID').format(amount);
	// return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

export { formatToRupiah };
