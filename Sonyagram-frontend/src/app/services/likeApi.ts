import { Like } from '../types';
import { Api } from './api';

export const likeApi = Api.injectEndpoints({
	endpoints: build => ({
		likePost: build.mutation<Like, { postId: string }>({
			query: likeData => ({
				url: '/likes',
				method: 'POST',
				body: likeData,
			}),
		}),
		unlikePost: build.mutation<Like, { id: string }>({
			query: ({ id }) => ({
				url: `/likes/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;
