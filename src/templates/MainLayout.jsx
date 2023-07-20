import React from 'react';

const Header = ({ title, children }) => {
	return (
		<div className="flex items-center justify-between">
			<h1 className="text-gray-700 text-xl">{title}</h1>
			<div className="flex items-center gap-x-1">{children}</div>
		</div>
	);
};

const LimiterContainer = ({ children }) => {
	return <div className="flex items-center justify-between mt-4">{children}</div>;
};

const PageTitle = ({ title }) => <h1 className="text-2xl text-white">{title}</h1>;

const MainLayout = ({ children, title }) => {
	return (
		<div className="p-4">
			<PageTitle title={title} />
			<div className="bg-white p-4 rounded shadow-md mt-4">{children}</div>
		</div>
	);
};

MainLayout.Header = Header;
MainLayout.LimiterContainer = LimiterContainer;
MainLayout.PageTitle = PageTitle;

export default MainLayout;
