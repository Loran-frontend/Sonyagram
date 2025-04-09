import { User } from '../types';
import { Api } from './api';

type updateUser = {
	id: string;
	email?: string;
	name?: string;
	bio?: string;
	location?: string;
	dateOfBirth?: string;
};

export const userApi = Api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<string, { email: string; password: string }>({
			query: userData => ({
				url: '/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: build.mutation<
			User,
			{ name: string; email: string; password: string }
		>({
			query: userData => ({
				url: '/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: build.query<User, void>({
			query: userData => ({
				url: '/current',
				method: 'GET',
				body: userData,
			}),
		}),
		getUserByID: build.query<User, string>({
			query: id => ({
				url: `/users/${id}`,
				method: 'GET',
			}),
		}),
		updateUser: build.mutation<User, updateUser>({
			query: ({ id, bio, dateOfBirth, email, location, name }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: { bio, dateOfBirth, email, location, name },
			}),
		}),
		getAllUsers: build.query<User[], void>({
			query: () => ({
				url: `/users`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCurrentQuery,
	useGetUserByIDQuery,
	useLazyCurrentQuery,
	useLazyGetUserByIDQuery,
	useLoginMutation,
	useRegisterMutation,
	useUpdateUserMutation,
	useGetAllUsersQuery,
	useLazyGetAllUsersQuery,
} = userApi;
