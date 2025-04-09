import { BASE_URL } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api/`,
	prepareHeaders: (headers, { getState }) => {
		const token =
			(getState() as RootState).user.token || localStorage.getItem('token');

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

export const Api = createApi({
	reducerPath: 'Api',
	baseQuery: baseQuery,
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
});
