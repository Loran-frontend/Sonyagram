import { Api } from './api';

export const followApi = Api.injectEndpoints({
	endpoints: build => ({
		followUser: build.mutation<{ message: string }, { followingId: string }>({
			query: followData => ({
				url: '/follow',
				method: 'POST',
				body: followData,
			}),
		}),
		unfollowUser: build.mutation<{ message: string }, { followingId: string }>({
			query: followData => ({
				url: '/unfollow',
				method: 'DELETE',
				body: followData,
			}),
		}),
	}),
});

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi;
