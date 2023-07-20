import React from 'react';
import { FormInput } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthFormState, setAccessToken, setForm, setUser } from '../../redux/reducer/authSlice';
import { useLoginMutation } from '../../redux/api/authApi';
import jwtDecode from 'jwt-decode';
import { toastError, toastSuccess } from '../../helper/toast';
import { resetErrors, setErrors } from '../../redux/reducer/validationSlice';
import { useNavigate } from 'react-router-dom';
import { Welcome2Img, Welcome3Img, WelcomeImg } from '../../assets';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector(getAuthFormState);

	const [login, { isLoading }] = useLoginMutation();

	const onChange = (e) => {
		const { name, value } = e.target;
		dispatch(setForm({ key: name, value }));
	};

	const onSubmit = async () => {
		console.log('form : ', form);

		dispatch(resetErrors());

		try {
			const response = await login(form).unwrap();
			const { user } = jwtDecode(response.data.token);

			console.log('user : ', user);

			toastSuccess(response.message);

			dispatch(setAccessToken(response.data.token));
			dispatch(setUser(user));

			navigate('/dashboard', { replace: true });
		} catch (error) {
			if (error.status === 422) return dispatch(setErrors(error.data.errors));
			toastError(error.data.message);
		}
	};
	return (
		<div className="min-h-screen max-h-screen">
			<div className="relative">
				<img src={Welcome3Img} className="max-h-screen w-full object-cover" />
				<div className="inset-0 flex items-center absolute">
					<div className="relative ml-20">
						<div className="bg-gradient-to-l from-[#F4D160] to-amber-200 h-[360px] w-[460px] absolute rotate-[24deg] rounded-2xl" />
						<div className="bg-gradient-to-l from-[#FBEEAC] to-amber-100 h-[360px] w-[460px] absolute rotate-[18deg] rounded-2xl" />
						<div className="bg-gradient-to-l from-[#1D5D9B] to-[#5b9dde] h-[360px] w-[460px] absolute rotate-[12deg] rounded-2xl" />
						<div className="bg-gradient-to-l from-[#75C2F6]  to-[#cde6fa] h-[360px] w-[460px] absolute rotate-[6deg] rounded-2xl" />
						<div className="bg-white h-[350px] w-[450px] relative border border-gray-300 rounded-2xl p-6">
							<h1 className="text-2xl text-[#011930] font-semibold">Silahkan Masuk</h1>
							<div className="mt-4 flex flex-col gap-1.5">
								<FormInput>
									<FormInput.Label title={'Nama Pengguna'} />
									<FormInput.TextInput
										name={'username'}
										value={form.username}
										onChange={onChange}
										disabled={false}
									/>
								</FormInput>
								<FormInput>
									<FormInput.Label title={'Kata Sandi'} />
									<FormInput.TextInput
										// type="password"
										name={'password'}
										value={form.password}
										onChange={onChange}
										disabled={isLoading}
									/>
								</FormInput>
							</div>
							<div className="mt-4">
								<FormInput.Button onClick={onSubmit} bgColor="sky" disabled={false}>
									Masuk
								</FormInput.Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
