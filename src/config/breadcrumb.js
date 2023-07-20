const ROUTES = [
	{ path: '/', breadcrumb: null },
	{ path: '/dashboard', breadcrumb: null },

	{ path: '/dashboard/products', breadcrumb: 'Produk' },
	{ path: '/dashboard/products/expired', breadcrumb: 'Stok Kedaluarsa' },
	{ path: '/dashboard/products/create', breadcrumb: 'Tambah Produk' },
	{ path: '/dashboard/products/:id', breadcrumb: null },
	{ path: '/dashboard/products/:id/detail', breadcrumb: 'Rincian Produk' },
	{ path: '/dashboard/products/:id/sale', breadcrumb: 'Penjualan' },
	{ path: '/dashboard/products/:id/purchase', breadcrumb: 'Pembelian' },
	{ path: '/dashboard/products/:id/order', breadcrumb: 'Pesanan' },
	{ path: '/dashboard/products/:id/stock-card', breadcrumb: 'Kartu Stok' },
	{ path: '/dashboard/products/:id/expired-date', breadcrumb: 'Tanggal Kadaluarsa' },
	{ path: '/dashboard/products/:id/history-opname-stock', breadcrumb: 'Riwayat Stok Opname' },

	{ path: '/dashboard/prescription', breadcrumb: 'Resep' },
	{ path: '/dashboard/prescription/concoction', breadcrumb: 'Racikan' },
	{ path: '/dashboard/prescription/redeem', breadcrumb: null },
	{ path: '/dashboard/prescription/redeem/:id', breadcrumb: 'Tebus Resep' },

	{ path: '/dashboard/sale', breadcrumb: 'Penjualan' },
	{ path: '/dashboard/sale/create', breadcrumb: 'Point of Sale (POS)' },

	{ path: '/dashboard/purchase', breadcrumb: 'Pembelian' },
	{ path: '/dashboard/purchase/plan', breadcrumb: 'Rencana Pembelian' },
	{ path: '/dashboard/purchase/order-list', breadcrumb: 'Daftar Pesanan' },
	{ path: '/dashboard/purchase/create', breadcrumb: 'Tambah Pembelian' },

	{ path: '/dashboard/consignment', breadcrumb: 'Konsinyasi' },

	{ path: '/dashboard/management/user', breadcrumb: 'Daftar Pengguna' },
	{ path: '/dashboard/management/customer', breadcrumb: 'Daftar Pelanggan' },
	{ path: '/dashboard/management/doctor', breadcrumb: 'Daftar Dokter' },

	{ path: '/dashboard/setting', breadcrumb: 'Pengaturan' },
	{ path: '/dashboard/setting/user-access', breadcrumb: 'Hak Akses Pengguna' },
	{ path: '/dashboard/setting/user-access/update-user-access', breadcrumb: null },
	{ path: '/dashboard/setting/user-access/update-user-access/:id', breadcrumb: 'Ubah' },
	{ path: '/dashboard/setting/product-unit', breadcrumb: 'Satuan Produk' },
	{ path: '/dashboard/setting/rack', breadcrumb: 'Rak' },
	{ path: '/dashboard/setting/warehouse', breadcrumb: 'Gudang' },
];

export default ROUTES;
