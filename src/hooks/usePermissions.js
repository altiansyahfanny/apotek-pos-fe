import { useSelector } from 'react-redux';
import { getPermissions } from '../redux/reducer/authSlice';

const usePermissions = () => {
	// const userRole = useSelector((state) => state.user.role)
	// const userRole = 'SALES';
	const userRole = 'OWNER';
	const permissions = useSelector(getPermissions);

	const hasPermission = (permissionName) => {
		return permissions[permissionName]?.includes(userRole);
	};

	return { hasPermission };
};

export default usePermissions;
