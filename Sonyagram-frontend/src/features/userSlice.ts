import { userApi } from '@/app/services/userApi';
import { RootState } from '@/app/store';
import { User } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';

type initialState = {
	user: User | null;
	current: User | null;
	isAuthenticated: boolean;
	token?: string | undefined;
};

const initialState: initialState = {
	current: null,
	user: null,
	isAuthenticated: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: () => initialState,
		resetUser: state => {
			state.user = null;
		},
	},
	extraReducers: build => {
		build
			.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
				state.token = action.payload;
				state.isAuthenticated = true;
			})
			.addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.current = action.payload;
			})
			.addMatcher(
				userApi.endpoints.getUserByID.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
				}
			);
	},
});

export const { logout, resetUser } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
	state.user.isAuthenticated;
export const selectCurrent = (state: RootState) => state.user.current;
export const selectUser = (state: RootState) => state.user.user;
