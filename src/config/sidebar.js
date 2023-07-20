const LINKS = [
	{
		parent_name: 'Produk',
		permissions: 'product',
		childrens: [
			{ name: 'Daftar Produk', to: 'products', permissions: 'product.read' },
			{
				name: 'Stok Kadaluarsa',
				to: 'products/expired',
				permissions: 'product.stock-expired.read',
			},
		],
	},
	{
		parent_name: 'Resep',
		permissions: 'prescription',
		childrens: [
			{ name: 'Daftar Resep', to: 'prescription', permissions: 'prescription.read' },
			{
				name: 'Racikan',
				to: 'prescription/concoction',
				permissions: 'prescription.concoction.read',
			},
		],
	},
	{
		parent_name: 'Penjualan',
		permissions: 'sale',
		childrens: [
			{ name: 'Poin of Sales (POS)', to: 'sale/create', permissions: 'sale.create' },
			{ name: 'Daftar Penjualan', to: 'sale', permissions: 'sale.read' },
		],
	},
	{
		parent_name: 'Pembelian',
		permissions: 'purchase',
		childrens: [
			{ name: 'Daftar Pembelian', to: 'purchase', permissions: 'purchase.read' },
			{ name: 'Rencana Pembelian', to: 'purchase/plan', permissions: 'purchase.plan.read' },
			{
				name: 'Daftar Pesanan',
				to: 'purchase/order-list',
				permissions: 'purchase.order-list.read',
			},
		],
	},
	{
		parent_name: 'Konsinyasi',
		permissions: 'consignment',
		childrens: [{ name: 'Daftar Konsinyasi', to: 'consignment', permissions: 'consignment.read' }],
	},
	{
		parent_name: 'Management',
		permissions: 'management',
		childrens: [
			{ name: 'Daftar Pengguna', to: 'management/user', permissions: 'management.user.read' },
			{
				name: 'Daftar Pelanggan',
				to: 'management/customer',
				permissions: 'management.customer.read',
			},
			{ name: 'Daftar Dokter', to: 'management/doctor', permissions: 'management.doctor.read' },
			{
				name: 'Daftar Supplier',
				to: 'management/supplier',
				permissions: 'management.supplier.read',
			},
		],
	},
	{
		parent_name: 'Pengaturan',
		permissions: 'setting',
		childrens: [
			{
				name: 'Hak Akses Pengguna',
				to: 'setting/user-access',
				permissions: 'setting.user-access.read',
			},
			{
				name: 'Satuan Produk',
				to: 'setting/product-unit',
				permissions: 'setting.product-unit.read',
			},
			{ name: 'Rak', to: 'setting/rack', permissions: 'setting.rack.read' },
			{ name: 'Gudang', to: 'setting/warehouse', permissions: 'setting.warehouse.read' },
		],
	},
];

export default LINKS;
