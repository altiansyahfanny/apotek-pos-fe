const LINKS = [
	{
		parent_name: 'Produk',
		childrens: [
			{ name: 'Daftar Produk', to: 'products' },
			{ name: 'Stok Kadaluarsa', to: 'products/expired' },
		],
	},
	{
		parent_name: 'Resep',
		childrens: [
			{ name: 'Daftar Resep', to: 'prescription' },
			{ name: 'Racikan', to: 'prescription/concoction' },
		],
	},
	{
		parent_name: 'Penjualan',
		childrens: [
			{ name: 'Poin of Sales (POS)', to: 'sale/create' },
			{ name: 'Daftar Penjualan', to: 'sale' },
		],
	},
	{
		parent_name: 'Pembelian',
		childrens: [
			{ name: 'Daftar Pembelian', to: 'purchase' },
			{ name: 'Rencana Pembelian', to: 'purchase/plan' },
			{ name: 'Daftar Pesanan', to: 'purchase/order-list' },
		],
	},
	{
		parent_name: 'Konsinyasi',
		childrens: [{ name: 'Daftar Konsinyasi', to: 'consignment' }],
	},
	{
		parent_name: 'Management',
		childrens: [
			{ name: 'Daftar Pengguna', to: 'management/user' },
			{ name: 'Daftar Pelanggan', to: 'management/customer' },
			{ name: 'Daftar Dokter', to: 'management/doctor' },
			{ name: 'Daftar Supplier', to: 'management/supplier' },
		],
	},
	{
		parent_name: 'Pengaturan',
		childrens: [
			{ name: 'Hak Akses Pengguna', to: 'setting/user-access' },
			{ name: 'Satuan Produk', to: 'setting/product-unit' },
			{ name: 'Rak', to: 'setting/rack' },
			{ name: 'Gudang', to: 'setting/warehouse' },
		],
	},
];

export default LINKS;
