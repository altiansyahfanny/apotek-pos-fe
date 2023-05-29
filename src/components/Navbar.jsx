import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiCode } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { TfiBell } from 'react-icons/tfi';
import { ProfilePic } from '../assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="bg-primary flex items-center justify-between p-3 fixed top-0 left-0 right-0 z-50">
			<div className="flex items-center gap-x-4">
				<div className="cursor-pointer hover:bg-slate-400 hover:bg-opacity-30 text-gray-300 p-2 rounded-full">
					<GiHamburgerMenu size={20} />
				</div>
				<Link to={'/dashboard'}>
					<div className="flex items-center gap-x-2">
						<HiCode size={40} color="#fff" />
						<h1 className="text-white text-lg">Logo</h1>
					</div>
				</Link>
			</div>
			<div className="flex items-center gap-x-6">
				<div className="text-gray-300 hover:text-white cursor-pointer">
					<FiSearch size={20} />
				</div>
				<div className="text-gray-300 hover:text-white cursor-pointer">
					<IoSettingsOutline size={20} />
				</div>
				<div className="text-gray-300 hover:text-white cursor-pointer">
					<TfiBell size={20} />
				</div>
				<div className="flex items-center gap-x-3 text-gray-300 hover:text-white cursor-pointer">
					<img className="w-9 h-9  aspect-square rounded-full" src={ProfilePic} />
					<p className="font-normal text-sm">Owner</p>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
