import React from 'react';

const Table = ({ children }) => {
	return (
		<div className="overflow-x-auto relative z-0 flex flex-col flex-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 pb-2 overflow-y-hidden">
			<table className="text-sm text-left rounded overflow-hidden w-full">{children}</table>
		</div>
	);
};

const TH = ({ children }) => (
	<thead className="text-sm capitalize text-white bg-secondary ">
		<tr>{children}</tr>
	</thead>
);

const THD = ({ children, textAlign = 'left', px = '', width = '' }) => (
	<th scope="col" className={`text-${textAlign} ${width} py-3 px-6 whitespace-nowrap`}>
		{children}
	</th>
);

const TB = ({ children }) => <tbody>{children}</tbody>;

const TBR = ({ children }) => (
	<tr className=" border-b bg-white border-gray-200 group text-gray-700 hover:text-white">
		{children}
	</tr>
);

const TBD = ({ children, textAlign = 'left', px = '6' }) => (
	<th
		scope="row"
		className={`text-${textAlign} py-4 px-${px} font-medium whitespace-nowrap group-hover:bg-green_tea `}
	>
		{children}
	</th>
);

const LimiterContainer = ({ children }) => {
	return <div className="flex items-center justify-between mt-4">{children}</div>;
};

const StatusBadge = ({ status = 'Dijual', bg = 'bg-green-500' }) => {
	return <span className={`${bg} text-white text-[0.6rem] px-2 py-0.5 rounded`}>{status}</span>;
};

Table.TH = TH;
Table.THD = THD;
Table.TB = TB;
Table.TBR = TBR;
Table.TBD = TBD;
Table.LimiterContainer = LimiterContainer;
Table.StatusBadge = StatusBadge;

export default Table;
