import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { getValidationError } from '../helper/form';

const InputSelect = ({ index = 0, className, children, value, name }) => {
	const ref = useRef();
	const [isOpen, setIsOpen] = useState(false);

	const error = getValidationError(`products[${index}].${name}`);

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

	return (
		<div className={`relative ${className}`} ref={ref} style={{ zIndex: 40 - index }}>
			<div
				className={`px-2 py-1 border  ${error && 'border-red-500'} ${
					isOpen ? 'border-lime-500' : 'border-gray-500'
				} text-xs rounded-sm cursor-pointer flex items-center justify-between`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="whitespace-nowrap">{value}</div>
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
					<div
						className="absolute border mt-1 left-0 right-0 rounded-sm border-gray-500 overflow-hidden bg-white"
						onClick={() => setIsOpen(false)}
					>
						<ul className="py-1">{children}</ul>
					</div>
				</Transition.Child>
			</Transition>
		</div>
	);
};

const TextInput = ({ index = 0, className, onChange, value, name, parentName = 'products' }) => {
	const error = getValidationError(`${parentName}[${index}].${name}`);

	return (
		<input
			name={name}
			value={value}
			onChange={onChange}
			type="text"
			className={`${className} ${error ? 'form-input-table-error' : 'form-input-table'}`}
		/>
	);
};

const Option = ({ onClick, children }) => {
	return (
		<li
			onClick={onClick}
			className="px-2 py-1 hover:bg-lime-500 hover:text-white cursor-pointer whitespace-nowrap"
		>
			{children}
		</li>
	);
};

const FormInputTable = ({ children, className = 'flex flex-col gap-1.5' }) => {
	return <div className={className}>{children}</div>;
};

FormInputTable.Option = Option;
FormInputTable.InputSelect = InputSelect;
FormInputTable.TextInput = TextInput;

export default FormInputTable;
