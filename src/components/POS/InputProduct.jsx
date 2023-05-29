import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../redux/reducer/posSlice';

const PRODUCTS = [
	{
		product_id: 1,
		name: 'Antangin Jrg Original Sach',
		price: 3000,
		product_units: [
			{ product_unit_id: 1, product_unit_name: 'Sachet', price: 3000 },
			{ product_unit_id: 2, product_unit_name: 'Pack', price: 20000 },
		],
	},
	{
		product_id: 2,
		name: 'Cek Gula Darah',
		price: 50000,
		product_units: [
			{ product_unit_id: 1, product_unit_name: 'Pasien', price: 50000 },
			{ product_unit_id: 2, product_unit_name: 'Keluarga (4 Org)', price: 75000 },
		],
	},
];

const InputProduct = () => {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleClick = () => setIsOpen(!isOpen);

	const dispatch = useDispatch();
	const { products } = useSelector(getForm);

	const handleSelect = (product) => {
		const value = [...products];
		value.push({ ...product, product_qty: 1, product_subtotal: product.price });
		dispatch(setForm({ key: 'products', value }));
	};

	return (
		<div className="relative w-8/12" ref={dropdownRef}>
			<button
				type="button"
				className="w-full border-2 rounded p-btn bg-white text-left"
				onClick={handleClick}
			>
				<span className="text-sm text-gray-500">Ketik nama atau kode produk</span>
			</button>

			{isOpen && (
				<div className="bg-white absolute w-full mt-2 border rounded">
					<div className="p-2">
						<input
							placeholder=""
							className="border py-2 px-3 w-full focus:outline-none focus:border-green_tea focus:border-2 rounded transition text-gray-700"
							autoFocus
						/>
					</div>
					<ul className="text-sm" onClick={() => setIsOpen(false)}>
						{PRODUCTS.map((product, index) => (
							<li
								key={index}
								className="p-2 hover:bg-green_tea hover:text-white text-gray-700 cursor-pointer"
								onClick={() => handleSelect(product)}
							>
								{product.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default InputProduct;
