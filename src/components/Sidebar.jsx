import React, { useState } from 'react';
import { BiPurchaseTagAlt, BiUser } from 'react-icons/bi';
import { BsCode, BsFillSquareFill, BsPrescription2 } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCartOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdPointOfSale } from 'react-icons/md';
import { RxCodesandboxLogo } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import LINKS from '../config/sidebar';
import { usePermissions } from '../hooks';
import { FaCode } from 'react-icons/fa';

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

const NavlinkColllapsible = ({ title = 'Sidebar', children, links }) => {
	const { hasPermission } = usePermissions();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className="px-5 py-2 cursor-pointer" onClick={toggleMenu}>
			<div className="flex items-start gap-4 relative">
				<div className="relative z-10 bg-white">{children}</div>
				<div className="flex flex-1 items-center justify-between whitespace-nowrap -translate-x-10 text-sm opacity-0 group-hover:opacity-100 ease-in group-hover:-translate-x-0 transition-all relative z-0 duration-300 ">
					<span>{title}</span>
					<span className={` transition transform ${isOpen && '-rotate-180'} `}>
						<MdKeyboardArrowDown />
					</span>
				</div>
			</div>
			{isOpen &&
				[...links].map((link, index) => {
					if (hasPermission(link.permissions)) {
						return (
							<div className="flex items-start relative gap-4 mt-4">
								<div className="relative z-10 bg-white">
									<BsFillSquareFill size={20} color="white" />
								</div>
								<div className="flex flex-1 items-center justify-between whitespace-nowrap -translate-x-10 text-sm opacity-0 group-hover:opacity-100 ease-in group-hover:-translate-x-0 transition-all relative z-0 duration-300 ">
									<Link key={index} to={link.to}>
										<span className="whitespace-nowrap py-1 text-sm">{link.name}</span>
									</Link>
								</div>
							</div>
						);
					}
				})}
		</div>
	);
};

const Sidebar = () => {
	const { hasPermission } = usePermissions();
	return (
		<div
			className="bg-white fixed top-0 bottom-0 overflow-hidden z-50 overflow-y-scroll group transition-all w-[60px] hover:w-56 duration-200 select-none hover:shadow-lg"
			style={{ zIndex: 998 }}
		>
			<div className="flex items-center gap-4 p-5 relative">
				<div className="relative z-10 bg-white">
					<FaCode size={20} />
				</div>
				<p className="-translate-x-10 text-sm opacity-0 group-hover:opacity-100 ease-in group-hover:-translate-x-0 transition-all relative z-0 duration-300 ">
					<Link to={'/dashboard'}>
						<h1 className=" text-xl whitespace-nowrap font-medium font-serif">Point of Sales</h1>
					</Link>
				</p>
			</div>

			<div className="flex flex-col gap-1.5">
				{LINKS.map((link, index) => {
					if (hasPermission(link.permissions)) {
						return (
							<NavlinkColllapsible key={index} title={link.parent_name} links={link.childrens}>
								<NavlinkIcon name={link.parent_name} />
							</NavlinkColllapsible>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Sidebar;
