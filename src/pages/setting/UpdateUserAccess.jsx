import React from 'react';
import { MainLayout } from '../../templates';
import {
	useGetPermissionModuleQuery,
	useUpdatePermissionMutation,
} from '../../redux/api/permissionApi';
import { Loader } from '../../components';
import Form from '../../components/UpdateUserAccess/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccessFormState, setAllForm } from '../../redux/reducer/userAccessSlice';
import { toastSuccess } from '../../helper/toast';
import { useParams } from 'react-router-dom';

const UpdateUserAccess = () => {
	const dispatch = useDispatch();

	const { id } = useParams();

	const { data: modules, isLoading, isSuccess, isError, error } = useGetPermissionModuleQuery(id);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setAllForm(modules));
		}
	}, [isSuccess]);

	let content;
	if (isLoading) content = <Loader />;
	if (isError) content = <p>{error.data.message ?? 'Error'}</p>;
	if (isSuccess) content = <Form />;

	const form = useSelector(getUserAccessFormState);

	const [update] = useUpdatePermissionMutation();

	const onSubmit = async () => {
		console.log('form : ', form);
		// return;

		try {
			const response = await update({ data: form, id }).unwrap();
			console.log('response : ', response.data);

			dispatch(setAllForm(response.data));
			toastSuccess(response.message);
		} catch (error) {
			// toastError(error.data.message);

			console.log('error : ', error);
		}
	};

	return (
		<MainLayout title="Ubah">
			{content}
			<div className="mt-4">
				<button className="bg-lime-500 text-white px-3 py-1.5 rounded" onClick={onSubmit}>
					Ubah
				</button>
			</div>
		</MainLayout>
	);
};

export default UpdateUserAccess;
