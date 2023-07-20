import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundImg } from '../../assets';

const NotFound = ({ title = 'Page Not Found', statusCode = 404, illustration = NotFoundImg }) => {
	return (
		<div className="bg-white grid place-content-center min-h-screen relative">
			<img src={illustration} className="h-60" />
			<span className="text-2xl text-center">{`${statusCode} | ${title}`}</span>
			{statusCode !== 500 && (
				<div className="absolute top-0 right-0 p-4">
					<Link to={'login'} className="bg-lime-500 text-sm text-white px-3 py-1.5 rounded">
						Masuk
					</Link>
				</div>
			)}
		</div>
	);
};

export default NotFound;
