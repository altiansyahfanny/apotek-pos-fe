import jwtDecode from 'jwt-decode';
import { apiSlice } from './apiSlice';
import { setAccessToken, setUser, logOut } from '../reducer/authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `auth`,
				method: 'POST',
				body: data,
			}),
		}),
		refresh: builder.mutation({
			query: () => ({
				url: '/auth/refresh',
				method: 'GET',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { user } = jwtDecode(data.data.token);

					console.log('refresh in authApi : ', user);

					dispatch(setUser(user));
					dispatch(setAccessToken(data.data.token));
				} catch (err) {
					console.log('refresh api err : ', err);
				}
			},
		}),

		sendLogout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log(data);
					dispatch(logOut());
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } = authApi;
