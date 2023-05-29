import React, { Fragment, useState } from 'react';
import { BiPurchaseTagAlt, BiUser } from 'react-icons/bi';
import { BsPrescription2 } from 'react-icons/bs';
import { IoCartOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdPointOfSale } from 'react-icons/md';
import { RxCodesandboxLogo } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import LINKS from '../config/sidebar';
import { Transition } from '@headlessui/react';

const NavlinkIcon = ({ name }) => {
	let content = <RxCodesandboxLogo size={20} />;
	switch (name) {
		case 'Produk':
			content = <RxCodesandboxLogo size={20} />;
			break;
		case 'Resep':
			content = <BsPrescription2 size={20} />;
			break;
		case 'Penjualan':
			content = <MdPointOfSale size={20} />;
			break;
		case 'Pembelian':
			content = <BiPurchaseTagAlt size={20} />;
			break;
		case 'Konsinyasi':
			content = <IoCartOutline size={20} />;
			break;
		case 'Management':
			content = <BiUser size={20} />;
			break;
		case 'Pengaturan':
			content = <IoSettingsOutline size={20} />;
			break;

		default:
			content = <RxCodesandboxLogo size={20} />;
			break;
	}

	return content;
};

const NavlinkColllapsible = ({ title, links, children }) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<>
			<div
				className="text-gray-500 flex items-start gap-4  cursor-pointer"
				onClick={toggleCollapse}
			>
				<div className="p-1">{children}</div>
				<div className="hidden w-full group-hover:block transition">
					<div className="flex items-center justify-between w-full hover:text-gray-700">
						<span>{title}</span>
						<span className={` transition transform ${!isCollapsed && '-rotate-180'}`}>
							<MdKeyboardArrowDown />
						</span>
					</div>
					{!isCollapsed && (
						<ul className="mt-2">
							{[...links].map((link, index) => (
								<Link key={index} to={link.to}>
									<li className="whitespace-nowrap py-1 text-sm hover:text-gray-700">
										{link.name}
									</li>
								</Link>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};

const Sidebar = () => {
	return (
		<div className="bg-white fixed top-0 bottom-0 mt-[64px] w-16 hover:w-56 group transition-all overflow-hidden z-50 overflow-y-scroll">
			<div className="flex flex-col gap-4 p-4">
				{LINKS.map((link, index) => {
					return (
						<NavlinkColllapsible key={index} title={link.parent_name} links={link.childrens}>
							<NavlinkIcon name={link.parent_name} />
						</NavlinkColllapsible>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
