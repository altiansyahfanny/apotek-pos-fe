import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar, Footer, Breadcrumb } from '../components';

const DashLayout = () => {
	return (
		<div className="min-h-screen max-h-screen bg-gray-100 relative flex flex-col">
			<Navbar />
			<Sidebar />
			<div className="bg-gray-100 flex-1 mt-[64px] ml-[64px] flex flex-col justify-between">
				<Breadcrumb />
				<div className="flex-1">
					<Outlet />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default DashLayout;
