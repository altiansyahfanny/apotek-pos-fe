import React from 'react';
import { FaGooglePlusG, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
	return (
		<div className="p-4 flex items-center justify-between">
			<h1 className="text-gray-400">
				Copyright © 2023 <span className="text-green_tea">Tarkiz Paz Banua</span>. All Rights
				Reserved
			</h1>
			<div className="flex items-center gap-x-2 text-gray-500">
				<span className=" font-light text-xs">Follow us</span>
				<FaFacebook size={15} />
				<FaTwitter size={15} />
				<FaGooglePlusG size={20} />
			</div>
		</div>
	);
};

export default Footer;
