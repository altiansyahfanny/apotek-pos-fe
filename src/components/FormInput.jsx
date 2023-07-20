import React, { Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getValidationError } from '../helper/form';
import { IoIosArrowDown } from 'react-icons/io';
import { Transition } from '@headlessui/react';

const Label = ({ title, required = false }) => (
	<label className={`text-sm text-gray-700`}>
		{title}
		{required && <span className="text-red-500">*</span>}
	</label>
);

const TextInput = React.forwardRef(
	({ type = 'text', disabled = false, value, onChange, name, note, customError = false }, ref) => {
		const childRef = useRef(null);

		let error = getValidationError(name);
		if (customError) error = true;

		useImperativeHandle(ref, () => ({
			focusChildElement: () => {
				childRef.current.focus();
			},
			blurChildElement: () => {
				childRef.current.focus();
			},
			disabledChildElement: (value) => {
				childRef.current.disabled = value;
			},
		}));
		return (
			<div>
				<input
					ref={childRef}
					className={`${error ? ' form-input-error' : 'form-input'}`}
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
				{note && (
					<p className="text-xs text-red-500">(hanya untuk mempermudah penentuan harga jual)</p>
				)}
				{error && typeof error !== 'boolean' && (
					<p className="inline-block text-xs text-red-500">{error}</p>
				)}
			</div>
		);
	}
);

const TextArea = ({
	type = 'text',
	disabled = false,
	value,
	onChange,
	name,
	customError = false,
	rows = 4,
}) => {
	let error = getValidationError(name);
	if (customError) error = true;

	return (
		<div>
			<textarea
				className={`${error ? ' form-input-error' : 'form-input'}`}
				type={'type'}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
				rows={rows}
			/>

			{error && typeof error !== 'boolean' && (
				<p className="inline-block text-xs text-red-500">{error}</p>
			)}
		</div>
	);
};

const InputSelect = ({ name, value, onChange, children, disabled, customError = false }) => {
	let error = getValidationError(name);
	if (customError) {
		error = true;
	}
	return (
		<>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className={`${error ? ' form-input-error' : 'form-input'}`}
				disabled={disabled}
			>
				{children}
			</select>
			{error && typeof error !== 'boolean' && (
				<span className="inline-block text-xs text-red-500">{error}</span>
			)}
		</>
	);
};

const Option = ({ children, value }) => {
	return <option value={value}>{children}</option>;
};

const SideButton = ({ children, textColor = 'text-white', bgColor = 'bg-red-500', onClick }) => {
	return (
		<div
			className={`grid place-content-center rounded px-3 cursor-pointer transition py-2.5 ${bgColor} ${textColor}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

const InputFile = ({ file_name, onFileUpload, accept }) => {
	const fileRef = useRef();

	return (
		<>
			<div className="flex rounded-tr rounded-br overflow-hidden">
				<div className="border-y-2 border-l-2 border-gray-300 rounded-tl rounded-bl text-gray-700 text-sm flex-1 px-2 py-1.5">
					<div className="whitespace-nowrap">
						{file_name.length > 30 ? file_name.slice(0, 30) + '...' : file_name}
					</div>
				</div>
				<div
					className="bg-primary text-white h-full px-4 py-2 text-sm cursor-pointer transition hover:bg-primaryOnHover"
					onClick={() => fileRef.current.click()}
				>
					Unggah
				</div>
			</div>
			<input ref={fileRef} type="file" className="hidden" accept={accept} onChange={onFileUpload} />
		</>
	);
};

const Button = ({ children, bgColor = 'slate', onClick, type = 'button', disabled = false }) => {
	return (
		<button
			type={type}
			className={`grid place-content-center rounded px-3 cursor-pointer transition text-sm py-1.5 bg-${bgColor}-500 text-${bgColor}-50 hover:bg-${bgColor}-600 disabled:bg-${bgColor}-200 disabled:text-${bgColor}-500 focus:outline-none`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

const InputSelectWithSearch = ({
	isOpen,
	setIsOpen,
	keyword,
	setKeyword,
	placeholder,
	children,
	disabled = false,
	name,
}) => {
	const ref = useRef();

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

	const onClick = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	// let error = true;
	let error = getValidationError(name);

	return (
		<div className="relative w-full" ref={ref}>
			<div
				className={`flex items-center justify-between py-1.5 px-3 rounded border-2 ${
					error ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'
				} cursor-pointer overflow-hidden  text-sm ${disabled && 'bg-gray-100'}`}
				onClick={onClick}
			>
				<span>{placeholder}</span>
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
						<ul className="mt-1.5 px-1.5 flex flex-col gap-y-0.5">{children}</ul>
					</div>
				</Transition.Child>
			</Transition>
			{error && typeof error !== 'boolean' && (
				<p className="inline-block text-xs text-red-500">{error}</p>
			)}
		</div>
	);
};

const OptionInputSelectWithSearch = ({ onClick, children, isActive }) => {
	return (
		<li
			className={`py-1.5 text-sm  cursor-pointer px-2 rounded ${
				isActive ? 'text-white bg-lime-500' : 'bg-white text-gray-700  hover:bg-gray-200'
			}`}
			onClick={onClick}
		>
			{children}
		</li>
	);
};

const FormInput = ({ children, className = 'flex flex-col gap-1.5' }) => {
	return <div className={className}>{children}</div>;
};

InputSelect.Option = Option;

FormInput.Label = Label;
FormInput.InputSelect = InputSelect;
FormInput.TextInput = TextInput;
FormInput.TextArea = TextArea;
FormInput.SideButton = SideButton;
FormInput.InputFile = InputFile;
FormInput.Button = Button;
FormInput.InputSelectWithSearch = InputSelectWithSearch;
FormInput.OptionInputSelectWithSearch = OptionInputSelectWithSearch;

export default FormInput;
