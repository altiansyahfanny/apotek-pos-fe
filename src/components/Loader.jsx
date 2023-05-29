import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div
			className="bg-gray-900 bg-opacity-40 fixed inset-0 flex items-center justify-center"
			style={{ zIndex: 999 }}
		>
			<PulseLoader color={'#FFF'} />
		</div>
	);
};

export default Loader;
