import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { TfiBell } from 'react-icons/tfi';
import Button from './Navbar/Button';
import Profile from './Navbar/Profile/Profile';

const Navbar = () => {
	return (
		<div className="border-b flex items-center justify-end p-3">
			<div className="flex items-center gap-x-1.5">
				<Button>
					<FiSearch size={16} />
				</Button>
				<Button>
					<IoSettingsOutline size={16} />
				</Button>
				<Button>
					<TfiBell size={16} />
				</Button>

				<div className="ml-4">
					<Profile />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
