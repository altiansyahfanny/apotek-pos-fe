import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Pagination = ({ data, counter, setCounter }) => {
	return (
		<div className="flex items-center justify-between">
			<span className="text-gray-700 text-sm">Showing 1 to 50 of 300 entries</span>
			<div className="border divide-x rounded flex overflow-hidden ">
				<div className="px-3 py-1 grid place-content-center hover:bg-green_tea hover:text-white text-gray-700">
					<BiChevronLeft size={20} />
				</div>
				<div className="px-3 py-1 grid place-content-center hover:bg-green_tea hover:text-white text-gray-700">
					1
				</div>
				<div className="px-3 py-1 grid place-content-center hover:bg-green_tea hover:text-white text-gray-700">
					2
				</div>
				<div className="px-3 py-1 grid place-content-center hover:bg-green_tea hover:text-white text-gray-700">
					3
				</div>
				<div className="px-3 py-1 grid place-content-center hover:bg-green_tea hover:text-white text-gray-700">
					<BiChevronRight size={20} />
				</div>
			</div>
		</div>
	);
};

export default Pagination;
