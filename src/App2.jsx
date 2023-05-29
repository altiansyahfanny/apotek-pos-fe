import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
const api_host = 'https://raddythebrand.github.io/apex-legends/data.json';

const App = () => {
	const [data, setData] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [keyword, setKeyword] = useState('');
	const regex = new RegExp(keyword, 'i');

	const getData = async () => {
		setisLoading(true);
		setIsError(false);
		try {
			const dataFormServer = await axios.get(api_host);
			setData(dataFormServer.data);
			setisLoading(false);
		} catch (error) {
			setisLoading(false);
			setIsError(true);
			console.log('error : ', error);
		}
	};

	console.log('data : ', data);

	useEffect(() => {
		getData();
	}, []);

	let content;

	if (isLoading) {
		content = <p>Loading....</p>;
	}
	if (isError) {
		content = <p>Something went wrong!</p>;
	}

	if (!isLoading && !isError) {
		content = (
			<div>
				<div className="mb-2 flex justify-end">
					<input
						placeholder="Search by name"
						value={keyword}
						className="border rounded bg-gray-50 px-3 py-1.5 focus:outline-none focus:border-blue-500"
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</div>
				<div className="overflow-x-auto relative z-0 flex flex-col flex-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 pb-2 overflow-y-hidden">
					<table className="text-sm text-left rounded-t overflow-hidden w-full">
						<thead className="text-sm capitalize text-white bg-secondary ">
							<tr>
								<th className="py-3 px-6 whitespace-nowrap text-center">No</th>
								<th className="py-3 px-6 whitespace-nowrap">Image</th>
								<th className="py-3 px-6 whitespace-nowrap">Name</th>
								<th className="py-3 px-6 whitespace-nowrap">Nickname</th>
								<th className="py-3 px-6 whitespace-nowrap text-center">Age</th>
								<th className="py-3 px-6 whitespace-nowrap">Quote</th>
							</tr>
						</thead>
						<tbody>
							{data
								.filter((item) => regex.test(item.name))
								.map((item, index) => (
									<tr className="border-b bg-white border-gray-200 group text-gray-700">
										<td className=" py-4 px-6 font-medium whitespace-nowrap group-hover:bg-gray-100 text-center">
											{index + 1}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap group-hover:bg-gray-100">
											<img
												src={item.thumbnail.default}
												className="rounded-full h-10 object-contain border"
											/>
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap group-hover:bg-gray-100">
											{item.name}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap group-hover:bg-gray-100">
											{item.nickname}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap group-hover:bg-gray-100 text-center">
											{item.age}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap group-hover:bg-gray-100">
											{item.quote}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	return (
		<div className="p-8">
			<div>{content}</div>
		</div>
	);
};

export default App;
