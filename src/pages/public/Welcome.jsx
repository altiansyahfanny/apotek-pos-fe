import React from 'react';
import { LoginImg } from '../../assets/img';
import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div className="min-h-screen max-h-screen bg-green-500">
			<div className="relative">
				<img src={LoginImg} className="max-h-screen w-full object-cover" />
				<div className="bg-slate-50 absolute top-0 right-0 bottom-0 left-2/3 grid place-content-center p-6">
					<h1 className="text-5xl font-serif text-gray-800">Point of Sales Apotek</h1>
					<Link className="mt-8" to={'login'}>
						<span className="bg-gradient-to-r from-lime-600 to-lime-500 text-white py-2.5 px-6 rounded-full font-medium">
							Masuk
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
