import React from 'react';

const InputSelect = ({ children, onChange }) => {
	return (
		<select
			// value={value}
			onChange={onChange}
			className="px-2 py-1 border border-gray-500 text-xs focus:outline-none focus:border-green_tea focus:ring-0 rounded transition"
		>
			{children}
		</select>
	);
};

export default InputSelect;
