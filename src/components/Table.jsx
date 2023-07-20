import { Transition } from '@headlessui/react';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { IoMdOptions } from 'react-icons/io';
import { textColor } from '../utils/color';
import CompPagination from './Pagination';

const Table = ({ children }) => {
	return (
		<div className="overflow-x-auto relative pb-3">
			<table className="text-xs text-left rounded w-full">{children}</table>
		</div>
	);
};

const TH = ({ children }) => (
	<thead className="uppercase text-white bg-primary ">
		<tr>{children}</tr>
	</thead>
);

const THD = ({ children, textAlign = 'left', px = '', width = '' }) => (
	<th scope="col" className={`text-${textAlign} py-3 px-6 whitespace-nowrap`}>
		{children}
	</th>
);

const TB = ({ children }) => <tbody>{children}</tbody>;

const TBR = ({ children }) => (
	<tr className={`border-b bg-white border-gray-200 group text-gray-700 hover:text-gray-900`}>
		{children}
	</tr>
);

const TBD = ({ children, textAlign = 'left', px = '6', lineThrough = false }) => (
	<th
		scope="row"
		className={`text-${textAlign} py-4 px-${px} font-medium group-hover:bg-gray-200 whitespace-nowrap ${
			lineThrough && 'line-through'
		}`}
	>
		{children}
	</th>
);

const LimiterContainer = ({ children }) => {
	return <div className="flex items-center justify-between mt-4">{children}</div>;
};
const Pagination = ({ data, current_page, setQuery, limit }) => {
	return (
		<div className="mt-2">
			<CompPagination {...{ data, current_page, setQuery, limit }} />
		</div>
	);
};

const StatusBadge = ({ status = 'Dijual', bg = 'bg-green-500' }) => {
	return (
		<span
			className={`${bg} text-white text-[0.6rem] px-2 py-0.5 rounded font-semibold tracking-wide `}
		>
			{status}
		</span>
	);
};

const ButtonAction = ({ labelIcon = <IoMdOptions />, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div className="relative inline-block text-left" ref={dropdownRef}>
			<div className="relative inline-block text-left">
				<button
					type="button"
					className="inline-flex justify-center w-full p-x-[0.55rem] transition rounded focus:outline-none"
					id="dropdown-button"
					onClick={toggleDropdown}
				>
					{labelIcon}
				</button>
				<Transition appear show={isOpen} as={Fragment}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div
							className="origin-top-right absolute top-0 right-8 w-36 border rounded shadow bg-white z-10"
							onClick={() => setIsOpen(false)}
						>
							<div
								className="py-1 "
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="dropdown-button"
							>
								{children}
							</div>
						</div>
					</Transition.Child>
				</Transition>
			</div>
		</div>
	);
};

const Option = ({ icon, text, action, color = textColor.normal }) => {
	return (
		<button
			type="button"
			className={`w-full px-2 py-1 ${color} hover:bg-slate-200 block`}
			role="menuitem"
			onClick={action}
		>
			<div className="text-left">
				<span className="text-[14px]">{text}</span>
			</div>
		</button>
	);
};

ButtonAction.Option = Option;

Table.TH = TH;
Table.THD = THD;
Table.TB = TB;
Table.TBR = TBR;
Table.TBD = TBD;
Table.LimiterContainer = LimiterContainer;
Table.Pagination = Pagination;
Table.StatusBadge = StatusBadge;
Table.ButtonAction = ButtonAction;

export default Table;
