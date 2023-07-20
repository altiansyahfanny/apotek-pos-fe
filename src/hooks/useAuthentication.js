import { useSelector } from 'react-redux';
import { getAccessToken } from '../redux/reducer/authSlice';

const useAuthentication = () => {
	const token = useSelector(getAccessToken);
	let isAuthorirized = false;

	console.log('token: ', token);

	if (token) {
		isAuthorirized = true;
		return { isAuthorirized };
	}

	return { isAuthorirized };
};

export default useAuthentication;
