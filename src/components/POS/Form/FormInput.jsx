import React from 'react';
import { getValidationError } from '../../../helper/form';

const Label = ({ title }) => <label className="text-sm text-gray-700">{title}</label>;

const TextInput = ({
	label,
	inline = true,
	type = 'text',
	disabled = false,
	value,
	onChange,
	name,
}) => {
	let error = getValidationError(name);

	return (
		<div className={`flex ${inline ? 'items-center' : 'flex-col gap-y-1.5'}`}>
			<div className={`${inline ? 'w-7/12' : 'w-full'}`}>
				<Label title={label} />
			</div>
			<div className={`${inline ? 'w-5/12' : 'w-full'}`}>
				<input
					className={` ${error ? 'form-input-error' : 'form-input'}`}
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

const InputSelect = ({
	label,
	inline = true,
	disabled = false,
	value,
	onChange,
	name,
	children,
}) => {
	return (
		<div className={`flex ${inline ? 'items-center' : 'flex-col gap-y-1.5'}`}>
			<div className={`${inline ? 'w-7/12' : 'w-full'}`}>
				<Label title={label} />
			</div>
			<div className={`${inline ? 'w-5/12' : 'w-full'}`}>
				<select
					className={`form-input`}
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
				>
					{children}
				</select>
			</div>
		</div>
	);
};

const Checkbox = ({ label, disabled = false, value, onChange, name, checked }) => {
	return (
		<div>
			<div className="flex items-center">
				<input
					checked={checked}
					id="checked-checkbox"
					name={name}
					type="checkbox"
					value={''}
					className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 focus:ring-2 mr-2"
					onChange={onChange}
					disabled={disabled}
				/>
				<Label title={label} />
			</div>
		</div>
	);
};

const Button = ({ bgColor, text, onClick }) => {
	return (
		<button
			className={`${bgColor} rounded  w-full px-2 py-3 text-xs font-semibold text-white tracking-wide focus:outline-none`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

const FormInput = ({ children }) => {
	return <>{children}</>;
};

FormInput.Label = Label;
FormInput.TextInput = TextInput;
FormInput.Button = Button;
FormInput.InputSelect = InputSelect;
FormInput.Checkbox = Checkbox;

export default FormInput;
