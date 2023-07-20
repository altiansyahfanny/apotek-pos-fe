import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api_host } from '../../config/api';
import { setAccessToken } from '../reducer/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: api_host,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.access_token;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	// If you want, handle other status codes, too
	if (result?.error?.status === 403) {
		console.log('sending refresh token');

		// send refresh token to get new access token
		const refreshResult = await baseQuery(`/auth/refresh`, api, extraOptions);

		console.log('refreshResult : ', refreshResult.data);

		if (refreshResult?.data) {
			// store the new token
			api.dispatch(setAccessToken(refreshResult.data.data.token));

			// retry original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			if (refreshResult?.error?.status === 403) {
				refreshResult.error.data.message = 'Your login has expired.';
			}
			return refreshResult;
		}
	}

	return result;
};

// export const apiSlice = createApi({
// 	baseQuery: baseQueryWithReauth,
// 	tagTypes: ['Product'],
// 	endpoints: (builder) => ({}),
// });

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	// baseQuery: fetchBaseQuery({ baseUrl: api_host }),
	tagTypes: [
		'UserAcess',
		'Permission',
		'Product',
		'ProductSales',
		'Purchase',
		'Invoice',
		'Supplier',
		'Warehouse',
		'Customer',
		'Doctor',
		'Sale',
		'PendingSale',
		'Prescription',
		'ProductUnit',
		'Concoction',
	],
	endpoints: (builder) => ({}),
});
