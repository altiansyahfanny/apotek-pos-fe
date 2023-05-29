const formatToRupiah = (amount) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 2,
	}).format(amount);
};

const formatThousand = (amount) => {
	return new Intl.NumberFormat('id-ID').format(amount);
};

export { formatToRupiah, formatThousand };
