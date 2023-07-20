import React from 'react';
import { useDispatch } from 'react-redux';

const SearchInput = ({ value, action }) => {
	const dispatch = useDispatch();
	return (
		<div>
			<input
				type="text"
				placeholder="Search"
				value={value}
				onChange={(e) => dispatch(action({ key: 'key_search', value: e.target.value }))}
				className="border-2 border-gray-300 text-sm py-1 px-2 focus:ring-0 focus:border-lime-500 rounded text-gray-700"
			/>
		</div>
	);
};

export default SearchInput;
