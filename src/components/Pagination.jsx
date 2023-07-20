import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

const Pagination = ({ data, current_page, setQuery, limit }) => {
	const dispatch = useDispatch();
	const total_page = Math.ceil(data?.total_data / data?.per_page);
	const previous = () => {
		dispatch(setQuery({ key: 'current_page', value: current_page <= 1 ? 1 : current_page - 1 }));
	};
	const next = () => {
		dispatch(
			setQuery({
				key: 'current_page',
				value: current_page === total_page ? total_page : current_page + 1,
			})
		);
	};

	const number = (index) => {
		dispatch(setQuery({ key: 'current_page', value: index }));
	};

	const arrTotalPage = new Array(total_page - 1 + 1).fill().map((_, idx) => 1 + idx);

	return (
		<div className="flex justify-between items-center">
			<span className="text-gray-700 text-sm">
				{`Menampilkan ${current_page * limit - limit + 1} hingga ${
					current_page * limit < data.total_data ? current_page * limit : data.total_data
				} dari ${data.total_data}
				total data`}
			</span>
			{total_page > 1 && (
				<div className="border divide-x rounded flex overflow-hidden ">
					<div
						className={`px-3 py-1 grid place-content-center hover:bg-lime-500 hover:text-white text-gray-700 cursor-pointer ${
							current_page === 1 ? 'bg-lime-500 text-white' : 'hover:bg-lime-500 hover:text-white'
						}`}
						onClick={() => previous()}
					>
						<BiChevronLeft size={20} />
					</div>
					{arrTotalPage.map((item, index) => (
						<div
							key={index}
							className={`px-4 py-1  cursor-pointer m-0 transition-all duration-200 ${
								current_page === item
									? 'bg-lime-500 text-white'
									: 'hover:bg-lime-500 hover:text-white'
							}`}
							onClick={() => number(item)}
						>
							{item}
						</div>
					))}

					<div
						className={`px-3 py-1 grid place-content-center hover:bg-lime-500 hover:text-white text-gray-700 cursor-pointer ${
							current_page === total_page
								? 'bg-lime-500 text-white'
								: 'hover:bg-lime-500 hover:text-white '
						}`}
						onClick={() => next()}
					>
						<BiChevronRight size={20} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Pagination;
