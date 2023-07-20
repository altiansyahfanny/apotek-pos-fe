import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

const RequireAuth = () => {
	const location = useLocation();
	const { isAuthorirized } = useAuthentication();

	if (!isAuthorirized) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	} else {
		return <Outlet />;
	}
};
export default RequireAuth;
