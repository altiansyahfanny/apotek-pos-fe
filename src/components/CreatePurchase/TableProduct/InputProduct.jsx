import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { useGetProductsQuery } from '../../../redux/api/productApi';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const Loader = () => (
	<div className="mt-1.5 p-1.5 h-16 grid place-content-center">
		<div className="flex flex-col items-center gap-2">
			<ScaleLoader color="#88c241" width={2} height={20} />
		</div>
	</div>
);

const ErrorMessage = () => (
	<div className="mt-1.5 p-1.5 h-16 grid place-content-center">
		<div className="flex flex-col items-center gap-2">
			<p className="text-xs text-gray-700">Gagal mengambil data</p>
		</div>
	</div>
);

const InputProduct = () => {
	const { data: PRODUCTS, isError, isLoading, isSuccess, error } = useGetProductsQuery();

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const inputRef = useRef();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (inputRef.current && isOpen) {
				inputRef.current.focus();
			}
		}, 200); // Ubah sesuai dengan durasi animasi yang Anda gunakan

		return () => clearTimeout(timeoutId);
	}, [isOpen]);

	const [keyword, setKeyword] = useState('');
	const regex = new RegExp(keyword, 'i');

	const dispatch = useDispatch();
	const { products } = useSelector(getAddPurchaseFormState);
	const form = useSelector(getAddPurchaseFormState);

	const onClick = (product) => {
		const newForm = [...products];
		let product_price = product.capital_price;

		if (form.tax_category == 2) {
			product_price = product.capital_price + (product.capital_price * form.tax) / 100;
		}
		newForm.push({
			// ...product,
			product_id: product.id,
			batch_number: '',
			expired_date: '',
			qty: 0,
			product_unit_id: '',
			product_price,
			product_purchase_price: product.capital_price,
			cashback: 0,
			cashback_with_percen: 0,
			capital_price: product.capital_price,
			analysis: 0,
			subtotal: 0,

			// tambahan untuk kemudahan manipulasi data
			name: product.name,
			product_unit: product.product_unit,
			other_product_units: product.other_product_units,
			qty_from_product_unit: 0,
			initital_product_price: product.capital_price,
		});
		dispatch(setForm({ key: 'products', value: newForm }));
		setIsOpen(false);
	};

	let content;

	if (isLoading) content = <Loader />;
	if (isError) content = <ErrorMessage />;
	if (isSuccess) {
		content = (
			<ul className="mt-1.5">
				{PRODUCTS.filter((product) => regex.test(product.name))
					.slice(0, 5)
					.map((product) => (
						<li
							key={product.id}
							className="py-1.5 text-sm text-gray-700 cursor-pointer hover:bg-lime-500 hover:text-white px-1.5"
							onClick={() => onClick(product)}
						>
							{product.name}
						</li>
					))}
			</ul>
		);
	}

	return (
		<div className="w-96 relative" ref={ref}>
			<div
				className="flex items-center  justify-between py-1.5 px-3 rounded border-2 cursor-pointer hover:bg-gray-100 overflow-hidden text-gray-700 text-sm"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="">Silahkan pilih produk</span>
				<div className={`${isOpen && 'rotate-180'} transition-all`}>
					<IoIosArrowDown />
				</div>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="border absolute bg-white left-0 right-0 mt-2 rounded overflow-hidden py-1.5 z-40">
						<div className="px-1.5">
							<input
								ref={inputRef}
								value={keyword}
								onChange={(event) => setKeyword(event.target.value)}
								className="form-input"
							/>
						</div>
						{content}
					</div>
				</Transition.Child>
			</Transition>
		</div>
	);
};

export default InputProduct;
