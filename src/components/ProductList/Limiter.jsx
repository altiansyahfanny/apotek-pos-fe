import React from 'react';
import { useDispatch } from 'react-redux';

const OPTIONS = [10, 25, 50, 100];

const Limiter = ({ limit, setLimit }) => {
	const dispatch = useDispatch();
	return (
		<div>
			<select
				value={limit}
				onChange={(e) => dispatch(setLimit(e.target.value))}
				className="py-1 pl-2 pr-5 text-sm bg-white border-2 border-gray-300 rounded focus:ring-0 focus:border-green_tea"
			>
				{OPTIONS.map((value, index) => (
					<option key={index} value={value}>
						{value}
					</option>
				))}
			</select>
			<span className="ml-2 text-gray-700">Items</span>
		</div>
	);
};

export default Limiter;
