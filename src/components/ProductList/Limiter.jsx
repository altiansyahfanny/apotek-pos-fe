import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef } from 'react';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch } from 'react-redux';

const OPTIONS = [10, 25, 50, 100];

const Limiter = ({ limit, setQuery }) => {
	const dispatch = useDispatch();

	const ref = useRef();
	const inputRef = useRef();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (inputRef.current && isOpen) {
				inputRef.current.focus();
			}
		}, 200); // Ubah sesuai dengan durasi animasi yang Anda gunakan

		return () => clearTimeout(timeoutId);
	}, [isOpen]);

	const onClick = () => setIsOpen(!isOpen);

	const onClickOption = (value) => {
		dispatch(setQuery({ key: 'limit', value }));
		setIsOpen(!isOpen);
	};
	return (
		<div className="flex items-center">
			<div className="relative w-20" ref={ref}>
				<div
					className={`flex items-center justify-between py-1 px-2 rounded border-2 border-gray-300 cursor-pointer overflow-hidden text-gray-700 text-sm`}
					onClick={onClick}
				>
					<span>{limit}</span>
					<div className={`${isOpen && 'rotate-180'} transition-all`}>
						<IoIosArrowDown />
					</div>
				</div>
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
						<div className="border absolute bg-white left-0 right-0 mt-2 rounded overflow-hidden py-1.5 z-40">
							<ul className="mt-1.5 px-1.5 flex flex-col gap-y-0.5">
								{OPTIONS.map((op) => (
									<li
										key={op}
										className={` py-1 px-2 text-sm  cursor-pointer rounded ${
											op === limit
												? 'text-white bg-primary'
												: 'bg-white text-gray-700  hover:bg-primaryToHover'
										}`}
										onClick={() => onClickOption(op)}
									>
										{op}
									</li>
								))}
							</ul>
						</div>
					</Transition.Child>
				</Transition>
			</div>
			<span className="ml-2 text-gray-700">Items</span>
		</div>
	);
};

export default Limiter;
