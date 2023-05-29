import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_UNITS } from '../../../data';
import {
	calculateProductPrice,
	calculateQty,
	calculateSubtotal,
} from '../../../helper/createPurchase';
import { getValidationError } from '../../../helper/form';
import { getAddPurchaseFormState, setForm } from '../../../redux/reducer/addPurchaseSlice';

const InputProductUnit = ({ product, index }) => {
	const error = getValidationError(`products[${index}].product_unit_id`);

	const dispatch = useDispatch();
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

	const form = useSelector(getAddPurchaseFormState);
	const products = form.products;

	const selectedProductUnit = PRODUCT_UNITS.find((pu) => pu.id === product.product_unit_id);

	const handleClick = (product_unit_id, number_of_product_units) => {
		setIsOpen(false);
		const newProducts = [...products];

		const total_qty = calculateQty(product.qty, number_of_product_units);
		const product_price = calculateProductPrice(
			product.product_purchase_price,
			product.cashback,
			form.tax,
			form.tax_category
		);
		const subtotal = calculateSubtotal(total_qty, product_price);

		newProducts[index] = {
			...newProducts[index],
			subtotal,
			qty_from_product_unit: number_of_product_units,
			product_unit_id,
		};

		dispatch(setForm({ key: 'products', value: newProducts }));
	};
	return (
		<div className="relative" ref={ref} style={{ zIndex: 40 - index }}>
			<div
				className={`px-2 py-1 border  ${error && 'border-red-500'} ${
					isOpen ? 'border-green_tea' : 'border-gray-500'
				} text-xs rounded-sm cursor-pointer flex items-center justify-between w-20`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div>{selectedProductUnit ? selectedProductUnit.name : 'Satuan'}</div>
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
					<div className="absolute border mt-1 left-0 right-0 rounded-sm border-gray-500 overflow-hidden bg-white">
						<ul className="py-1">
							<li
								key={index}
								onClick={() => handleClick(product.product_unit.id, 1)}
								className="px-2 py-1 hover:bg-green_tea hover:text-white cursor-pointer"
							>
								{product.product_unit.name}
							</li>
							{product.other_product_units.map((pu, index) => (
								<li
									key={index}
									onClick={() => handleClick(pu.product_unit_id, pu.number_of_product_units)}
									className="px-2 py-1 hover:bg-green_tea hover:text-white cursor-pointer"
								>{`${pu.product_unit.name} (${pu.number_of_product_units})`}</li>
							))}
						</ul>
					</div>
				</Transition.Child>
			</Transition>
		</div>
	);
};

export default InputProductUnit;
