import React from 'react';
import { Outlet } from 'react-router-dom';
import usePermissions from '../hooks/usePermissions';
import AccessDenied from '../pages/error/AccessDenied';

const ProtectedRoute = ({ permission, children }) => {
	const { hasPermission } = usePermissions();

	if (!hasPermission(permission)) {
		// return <Navigate to={routes.ACCESS_DENIED} />;
		return <AccessDenied />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
