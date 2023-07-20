import React from 'react';

const Button = ({ children }) => {
	return (
		<div className="text-gray-200 hover:text-white bg-white bg-opacity-10  cursor-pointer border transition border-transparent hover:border-white rounded p-1.5">
			{children}
		</div>
	);
};

export default Button;
