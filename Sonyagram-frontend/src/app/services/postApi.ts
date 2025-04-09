import { Post } from '../types';
import { Api } from './api';

export const postApi = Api.injectEndpoints({
	endpoints: build => ({
		createPost: build.mutation<Post, { content: string }>({
			query: postData => ({
				url: '/posts',
				method: 'POST',
				body: postData,
			}),
		}),
		getAllPosts: build.query<Post[], void>({
			query: () => ({
				url: '/posts',
				method: 'GET',
			}),
		}),
		getPostById: build.query<Post, string>({
			query: id => ({
				url: `/posts/${id}`,
				method: 'GET',
			}),
		}),
		deletePost: build.mutation<Post, { id: string }>({
			query: ({ id }) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useCreatePostMutation,
	useDeletePostMutation,
	useGetAllPostsQuery,
	useGetPostByIdQuery,
	useLazyGetAllPostsQuery,
	useLazyGetPostByIdQuery,
} = postApi;
