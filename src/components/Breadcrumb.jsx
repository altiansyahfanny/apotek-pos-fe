import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import ROUTES from '../config/breadcrumb';

const Breadcrumb = () => {
	const breadcrumbs = useBreadcrumbs(ROUTES);
	const location = useLocation();

	return (
		<div className="flex items-center gap-1 p-4 text-sm border-b">
			{breadcrumbs.map(({ breadcrumb, match }, index) => {
				const isLast = breadcrumbs.length - 1 === index;
				return (
					<NavLink
						key={match.pathname}
						to={match.pathname}
						className={`capitalize ${
							match.pathname == location.pathname ? 'text-gray-500' : 'text-gray-300'
						} `}
					>
						{!isLast ? (
							<div className="flex items-baseline gap-1">
								{breadcrumb.props.children}
								<div className="grid place-content-center">
									<MdKeyboardArrowRight size={11} />
								</div>
							</div>
						) : (
							breadcrumb
						)}
					</NavLink>
				);
			})}
		</div>
	);
};

export default Breadcrumb;
