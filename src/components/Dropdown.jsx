import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';

const Option = ({ children, isActive, action }) => {
	return (
		<button
			type="button"
			className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-primary ${
				!isActive ? 'hover:bg-primaryToHover' : 'bg-primary text-white'
			} `}
			role="menuitem"
			onClick={action}
		>
			{children}
		</button>
	);
};

const Dropdown = ({ labelIcon, children }) => {
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
					className="inline-flex justify-center w-full p-[0.55rem] bg-primary hover:bg-primaryOnHover transition rounded text-white focus:outline-none"
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
							className="origin-top-right absolute right-0 mt-2 w-52 border rounded shadow bg-white z-10"
							onClick={() => setIsOpen(false)}
						>
							<div
								className="py-1"
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

Dropdown.Option = Option;

export default Dropdown;
