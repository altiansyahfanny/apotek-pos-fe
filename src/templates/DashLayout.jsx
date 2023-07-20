import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar, Footer, Breadcrumb } from '../components';

const DashLayout = () => {
	return (
		<>
			<div className="fixed inset-0 bg-gray-100">
				<div className="bg-primary h-52" />
			</div>
			<div className="min-h-screen max-h-screen relative flex flex-col">
				<Sidebar />
				<div className="flex-1 ml-[60px] flex flex-col justify-between">
					<Navbar />
					<Breadcrumb />
					<div className="flex-1">
						<Outlet />
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default DashLayout;
