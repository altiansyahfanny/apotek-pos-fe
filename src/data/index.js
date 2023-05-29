const PRODUCT_UNITS = [
	{
		id: 1,
		name: 'Ampul',
	},
	{
		id: 2,
		name: 'Batang',
	},
	{
		id: 3,
		name: 'Biji',
	},
	{
		id: 4,
		name: 'Botol',
	},
	{
		id: 5,
		name: 'Box',
	},
	{
		id: 6,
		name: 'Buah',
	},
	{
		id: 7,
		name: 'Bungkus',
	},
	{
		id: 8,
		name: 'Butir',
	},
	{
		id: 9,
		name: 'CC',
	},
	{
		id: 10,
		name: 'Cm',
	},
	{
		id: 11,
		name: 'Dosin',
	},
	{
		id: 12,
		name: 'Dus',
	},
	{
		id: 13,
		name: 'Flakon',
	},
	{
		id: 14,
		name: 'Galon',
	},
	{
		id: 15,
		name: 'Gram',
	},
	{
		id: 16,
		name: 'Ikat',
	},
	{
		id: 17,
		name: 'Iris',
	},
	{
		id: 18,
		name: 'Kaleng',
	},
	{
		id: 19,
		name: 'Kapsul',
	},
	{
		id: 20,
		name: 'Karton',
	},
	{
		id: 21,
		name: 'Karung',
	},
	{
		id: 22,
		name: 'Kg',
	},
	{
		id: 23,
		name: 'Kotak',
	},
	{
		id: 24,
		name: 'Lembar',
	},
	{
		id: 25,
		name: 'Liter',
	},
	{
		id: 26,
		name: 'Miligram',
	},
	{
		id: 27,
		name: 'Mililiter',
	},
	{
		id: 28,
		name: 'Mililmeter',
	},
	{
		id: 29,
		name: 'Pasien',
	},
	{
		id: 30,
		name: 'Pcs',
	},
	{
		id: 31,
		name: 'Plabot',
	},
	{
		id: 32,
		name: 'Plabot',
	},
	{
		id: 33,
		name: 'Pot',
	},
	{
		id: 34,
		name: 'Pound',
	},
	{
		id: 35,
		name: 'Sachet',
	},
	{
		id: 36,
		name: 'Satuan',
	},
	{
		id: 37,
		name: 'Sloki',
	},
	{
		id: 38,
		name: 'Strip',
	},
	{
		id: 39,
		name: 'Supp',
	},
	{
		id: 40,
		name: 'Tablet',
	},
	{
		id: 41,
		name: 'Tube',
	},
	{
		id: 42,
		name: 'Unit',
	},
];

const ALTERNATIVE_PRICES = [
	{ alternative_price_id: 1, alternative_price_name: 'Grosir' },
	{ alternative_price_id: 2, alternative_price_name: 'Member' },
	{ alternative_price_id: 3, alternative_price_name: 'Online' },
];

const PRODUCT_CATEGORIES = [
	{
		id: 1,
		name: 'Alkes',
	},
	{
		id: 2,
		name: 'Jasa',
	},
	{
		id: 3,
		name: 'Obat',
	},
	{
		id: 4,
		name: 'Umum',
	},
];

const SUPPLIERS = [
	{ id: 1, name: 'PT. Angkasa Pura II' },
	{ id: 2, name: 'PT. Jasa Marga' },
];
const PRODUCT_STATUSES = [
	{ id: 1, name: 'Dijual' },
	{ id: 2, name: 'Tidak Dijual' },
];
const RACKS = [
	{ id: 1, name: 'Rak Khusus Obat' },
	{ id: 2, name: 'Rak Khusus Alkes' },
	{ id: 3, name: 'Rak Umum' },
];

const PAYMENT_ACCOUNTS = [
	{ id: 1, name: 'Kas Utama' },
	{ id: 2, name: 'BCA' },
	{ id: 3, name: 'BNI' },
];

const WAREHOUSES = [
	{ id: 1, name: 'Gudang Utama' },
	{ id: 2, name: 'Gudang Kelayan' },
	{ id: 3, name: 'Gudang Pasar Lama' },
];

const PRODUCTS = [
	{
		id: 1,
		supplier_id: 1,
		product_category_id: 1,
		product_unit_id: 1,
		rack_id: 1,
		product_status_id: 1,
		minimum_stock: 10,
		capital_price: 3300,
		price: 2000,
		name: 'Antangin Jrg Original Sach',
		sku_code: 'SKU1234',
		barcode: '12345678',
		active_substance: 'Dextro',
		other_information: 'Harus diminum setelah makan',
		product_category: {
			id: 1,
			name: 'Alkes',
		},
		product_status: {
			id: 1,
			name: 'Dijual',
		},
		product_unit: {
			id: 1,
			name: 'Ampul',
		},
		supplier: {
			id: 1,
			name: 'Kimia Farma',
		},
		purchases: [
			{
				id: 1,
				invoice_id: 1,
				product_id: 1,
				expired_date: '2023-10-01T00:00:00.000Z',
				batch_number: '1a-gr-4u',
				total_amount: 40000,
				qty: 10,
				cashback: 5000,
			},
			{
				id: 4,
				invoice_id: 2,
				product_id: 1,
				expired_date: '2023-10-01T00:00:00.000Z',
				batch_number: '1a-gr-4u',
				total_amount: 40000,
				qty: 10,
				cashback: 5000,
			},
		],
		product_stocks: [
			{
				id: 1,
				product_id: 1,
				batch_number: '1a-gr-4u',
				qty: 20,
			},
		],
		rack: {
			id: 1,
			warehouse_id: 1,
			name: 'Rak Khusus Obat',
			warehouse: {
				id: 1,
				name: 'Gudang Utama',
			},
		},
		other_product_units: [
			{
				id: 1,
				product_id: 1,
				product_unit_id: 2,
				number_of_other_product_units: 1,
				number_of_product_units: 10,
				product_unit: {
					id: 2,
					name: 'Batang',
				},
				product: {
					name: 'Komix',
					product_unit: {
						id: 1,
						name: 'Ampul',
					},
				},
			},
		],
		alternative_prices: [
			{
				id: 1,
				product_id: 1,
				alternative_price_category_id: 1,
				number_of_items: 1,
				minimum_item: 100,
				price: 1500,
				alternative_price_category: {
					id: 1,
					name: 'Grosir',
				},
			},
			{
				id: 2,
				product_id: 1,
				alternative_price_category_id: 1,
				number_of_items: 5,
				minimum_item: 500,
				price: 1200,
				alternative_price_category: {
					id: 1,
					name: 'Grosir',
				},
			},
		],
		stock_amount: 20,
	},
	{
		id: 2,
		supplier_id: 1,
		product_category_id: 3,
		product_unit_id: 2,
		rack_id: 1,
		product_status_id: 1,
		minimum_stock: 15,
		capital_price: 500,
		price: 5000,
		name: 'Paracetamol 500mg',
		sku_code: 'SKU4321',
		barcode: '87654321',
		active_substance: 'Asam Mefenamat',
		other_information: 'Bisa dikonsumsi tanpa harus makan',
		product_category: {
			id: 3,
			name: 'Obat',
		},
		product_status: {
			id: 1,
			name: 'Dijual',
		},
		product_unit: {
			id: 2,
			name: 'Batang',
		},
		supplier: {
			id: 1,
			name: 'Kimia Farma',
		},
		purchases: [
			{
				id: 2,
				invoice_id: 1,
				product_id: 2,
				expired_date: '2023-12-01T00:00:00.000Z',
				batch_number: '1a-gr-5u',
				total_amount: 100000,
				qty: 10,
				cashback: 0,
			},
			{
				id: 3,
				invoice_id: 1,
				product_id: 2,
				expired_date: '2023-12-01T00:00:00.000Z',
				batch_number: '1a-gr-6u',
				total_amount: 100000,
				qty: 1000,
				cashback: 0,
			},
			{
				id: 5,
				invoice_id: 2,
				product_id: 2,
				expired_date: '2023-12-01T00:00:00.000Z',
				batch_number: '1a-gr-5u',
				total_amount: 100000,
				qty: 10,
				cashback: 0,
			},
			{
				id: 6,
				invoice_id: 2,
				product_id: 2,
				expired_date: '2023-12-01T00:00:00.000Z',
				batch_number: '1a-gr-6u',
				total_amount: 100000,
				qty: 100,
				cashback: 0,
			},
		],
		product_stocks: [
			{
				id: 2,
				product_id: 2,
				batch_number: '1a-gr-5u',
				qty: 20,
			},
			{
				id: 3,
				product_id: 2,
				batch_number: '1a-gr-6u',
				qty: 1100,
			},
		],
		rack: {
			id: 1,
			warehouse_id: 1,
			name: 'Rak Khusus Obat',
			warehouse: {
				id: 1,
				name: 'Gudang Utama',
			},
		},
		other_product_units: [],
		alternative_prices: [],
		stock_amount: 1120,
	},
	// { id: 3, name: 'Mixagrib' },
	// { id: 4, name: 'Panadol' },
	// { id: 5, name: 'Lastrine' },
	// { id: 6, name: 'OBH' },
	// { id: 7, name: 'Paramex' },
	// { id: 8, name: 'Ponstan' },
];

export {
	PRODUCT_UNITS,
	ALTERNATIVE_PRICES,
	PRODUCT_CATEGORIES,
	SUPPLIERS,
	PRODUCT_STATUSES,
	RACKS,
	PAYMENT_ACCOUNTS,
	WAREHOUSES,
	PRODUCTS,
};
