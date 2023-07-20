import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Loader } from '../components';
import { usePersist } from '../hooks';
import jwtDecode from 'jwt-decode';
import { getAccessToken } from '../redux/reducer/authSlice';
import { useRefreshMutation } from '../redux/api/authApi';
import NotFound from '../pages/error/NotFound';
import { ServerErrorImg } from '../assets';

const PersistLogin = () => {
	// const [persist] = usePersist();
	const persist = true;
	const effectRan = useRef(false);

	const token = useSelector(getAccessToken);
	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { data, isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		const decoded = jwtDecode(data?.data?.token);
	// 		// console.log('decoded refresh : ', decoded);
	// 	}
	// }, [isSuccess]);

	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
			// React 18 Strict Mode

			const verifyRefreshToken = async () => {
				// console.log('verifying refresh token');
				try {
					await refresh();
					setTrueSuccess(true);
				} catch (err) {
					console.error(err);
				}
			};

			if (!token && persist) verifyRefreshToken();
		}

		return () => (effectRan.current = true);

		// eslint-disable-next-line
	}, []);

	let content;
	if (!persist) {
		// persist: no
		// console.log('no persist');
		content = <Outlet />;
	} else if (isLoading) {
		//persist: yes, token: no
		// console.log('loading');
		content = <Loader />;
	} else if (isError) {
		//persist: yes, token: no
		// console.log('error');
		if (typeof error.status !== 'string') {
			content = <NotFound statusCode={error.status} title={error.data.message} />;
		} else {
			content = content = (
				<NotFound statusCode={500} title={'Terjadi Kesalahan'} illustration={ServerErrorImg} />
			);
		}
	} else if (isSuccess && trueSuccess) {
		//persist: yes, token: yes
		content = <Outlet />;
	} else if (token && isUninitialized) {
		//persist: yes, token: yes
		// console.log('token and uninit');
		content = <Outlet />;
	}

	return content;
};
export default PersistLogin;
