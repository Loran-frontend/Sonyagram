import { Comment } from '../types';
import { Api } from './api';

export const commentApi = Api.injectEndpoints({
	endpoints: build => ({
		createComment: build.mutation<Comment, { postId: string; content: string }>(
			{
				query: commentData => ({
					url: '/comments',
					method: 'POST',
					body: commentData,
				}),
			}
		),
		deleteComment: build.mutation<Comment, { id: string }>({
			query: ({ id }) => ({
				url: `/comments/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
	commentApi;
