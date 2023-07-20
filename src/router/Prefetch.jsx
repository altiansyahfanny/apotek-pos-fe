import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetPermissionsQuery } from '../redux/api/permissionApi';
import { Loader } from '../components';
import { useDispatch } from 'react-redux';
import { setPermissions } from '../redux/reducer/authSlice';
// import { useGetPermissionsQuery } from '../redux/api/prescriptionApi';

const Prefetch = () => {
	const dispatch = useDispatch();
	const { data, isLoading, isSuccess, isError, error } = useGetPermissionsQuery();

	// console.log('Prefetch : ', data);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setPermissions(data));
		}
	}, [isSuccess]);

	let content;

	if (isLoading) content = <Loader />;
	if (isError) content = <p>Error Prefetch</p>;
	if (isSuccess) content = <Outlet />;

	return content;
};

export default Prefetch;
