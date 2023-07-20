import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import ROUTES from '../config/breadcrumb';
import { FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
	const breadcrumbs = useBreadcrumbs(ROUTES);
	const location = useLocation();

	return (
		<div className="flex items-center gap-1 px-4 py-2 text-sm mt-2">
			<Link to={'/dashboard'}>
				<div className="flex items-baseline gap-1">
					<FaHome color="#FFF" />
					{location.pathname !== '/dashboard' && (
						<div className="grid place-content-center text-white">
							<MdKeyboardArrowRight size={11} />
						</div>
					)}
				</div>
			</Link>
			{breadcrumbs.map(({ breadcrumb, match }, index) => {
				const isLast = breadcrumbs.length - 1 === index;
				return (
					<NavLink
						key={match.pathname}
						to={match.pathname}
						className={`capitalize ${
							match.pathname == location.pathname ? 'text-white' : 'text-gray-400'
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
