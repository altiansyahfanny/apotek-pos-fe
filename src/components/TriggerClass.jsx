import React from 'react';

const TriggerClass = () => {
	return (
		<div className="hidden">
			<div className=" text-green-50 hover:text-green-50 disabled:text-green-50" />
			<div className="text-green-500 hover:text-green-500 disabled:text-green-500" />
			<div className="bg-green-50 hover:bg-green-50 disabled:bg-green-50" />
			<div className="bg-green-500 hover:bg-green-500 disabled:bg-green-500" />
			<div className="bg-green-600 hover:bg-green-600 disabled:bg-green-600" />

			<div className=" text-red-50 hover:text-red-50 disabled:text-red-50" />
			<div className="text-red-500 hover:text-red-500 disabled:text-red-500" />
			<div className="bg-red-50 hover:bg-red-50 disabled:bg-red-50" />
			<div className="bg-red-500 hover:bg-red-500 disabled:bg-red-500" />
			<div className="bg-red-600 hover:bg-red-600 disabled:bg-red-600" />

			<div className=" text-slate-50 hover:text-slate-50 disabled:text-slate-50" />
			<div className="text-slate-500 hover:text-slate-500 disabled:text-slate-500" />
			<div className="bg-slate-50 hover:bg-slate-50 disabled:bg-slate-50" />
			<div className="bg-slate-500 hover:bg-slate-500 disabled:bg-slate-500" />
			<div className="bg-slate-600 hover:bg-slate-600 disabled:bg-slate-600" />
		</div>
	);
};

export default TriggerClass;
