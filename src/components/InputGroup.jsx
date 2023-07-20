import React from 'react';

const Text = ({ text }) => {
	return (
		<div className=" grid place-content-center text-sm px-3 bg-lime-500 text-white whitespace-nowrap">
			{text}
		</div>
	);
};

const Label = ({ title }) => {
	return <label className="text-gray-700 text-sm">{title}</label>;
};

const TextInput = ({ onChange, type = 'text', name, value }) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className={`w-full border-0 text-gray-700 text-sm px-2 py-1.5 focus:outline-none focus:ring-0 focus:border-green`}
		/>
	);
};

const Button = ({ children, textColor = 'text-white', bgColor = 'bg-red-500', onClick }) => {
	return (
		<div
			className={`flex-1 grid place-content-center rounded px-3 py-2.5 cursor-pointer transition ${bgColor} ${textColor}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

const InputGroup = ({ children, name, customError = false }) => {
	// let error = getValidationError(name);
	// if (customError) error = true;

	return (
		<div
			className={`flex border-2 ${
				customError ? 'border-red-500' : ' border-gray-300'
			} divide-gray-300 rounded divide-x-2  overflow-hidden`}
		>
			{children}
		</div>
	);
};

InputGroup.Text = Text;
InputGroup.Label = Label;
InputGroup.TextInput = TextInput;
InputGroup.Button = Button;

export default InputGroup;
