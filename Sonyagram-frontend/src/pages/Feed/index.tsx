import { useGetAllPostsQuery } from '@/app/services/postApi';
import { CreatePost } from '@/components/CreatePost/index.tsx';
import { FeedPost } from '@/components/FeedPost';

export function Feed() {
	const { data } = useGetAllPostsQuery();

	return (
		<div className='overflow-y-auto flex justify-center'>
			<div className='w-[600px] p-2 flex flex-col gap-3'>
				<CreatePost />
				{data?.map(post => (
					<FeedPost
						key={post.id}
						author={post.author}
						comments={post.comments}
						content={post.content}
						createdAt={post.createdAt}
						likes={post.likes}
						id={post.id}
					/>
				))}
			</div>
		</div>
	);
}
