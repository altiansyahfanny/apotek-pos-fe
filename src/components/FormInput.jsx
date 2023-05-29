import React, { useImperativeHandle, useRef } from 'react';
import { getValidationError } from '../helper/form';

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
					className="bg-green_tea text-white h-full px-4 py-2 text-sm cursor-pointer transition hover:bg-green_tea_hover"
					onClick={() => fileRef.current.click()}
				>
					Unggah
				</div>
			</div>
			<input ref={fileRef} type="file" className="hidden" accept={accept} onChange={onFileUpload} />
		</>
	);
};

const FormInput = ({ children, className = 'flex flex-col gap-1.5' }) => {
	return <div className={className}>{children}</div>;
};

InputSelect.Option = Option;

FormInput.Label = Label;
FormInput.InputSelect = InputSelect;
FormInput.TextInput = TextInput;
FormInput.SideButton = SideButton;
FormInput.InputFile = InputFile;

export default FormInput;
