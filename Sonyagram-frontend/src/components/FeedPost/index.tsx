import { useAppSelector } from '@/app/hooks';
import {
	useLikePostMutation,
	useUnlikePostMutation,
} from '@/app/services/likeApi';
import { useLazyGetAllPostsQuery } from '@/app/services/postApi';
import { Comment, Like, User } from '@/app/types';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import { formatToClientDate } from '@/utils/data-format';
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Image,
} from '@heroui/react';
import { BiComment, BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

type post = {
	author: User;
	comments: Comment[];
	content: string;
	createdAt: Date;
	likes: Like[];
	id: string;
};

export function FeedPost({
	author,
	comments,
	content,
	createdAt,
	likes,
	id,
}: post) {
	const [like] = useLikePostMutation();
	const [unLike] = useUnlikePostMutation();
	const [triggerPosts] = useLazyGetAllPostsQuery();
	const navigate = useNavigate();
	const currentData = useAppSelector(selectCurrent);

	const likePost = async () => {
		try {
			await like({ postId: id }).unwrap();
			await triggerPosts().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	const unLikePost = async () => {
		try {
			await unLike({ id }).unwrap();
			await triggerPosts().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card className='min-h-max'>
			<CardHeader className='flex gap-3'>
				<Image
					className='bg-default rounded-full'
					height={40}
					width={40}
					src={`${BASE_URL}${author?.avatarUrl}`}
				/>
				<div className='flex flex-col'>
					<p
						className='text-md cursor-pointer hover:underline'
						onClick={() => navigate(`users/${author.id}`)}
					>
						{author?.name}
					</p>
					<p className='text-small text-default-500'>
						{formatToClientDate(createdAt)}
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{content}</p>
			</CardBody>
			<Divider />
			<CardFooter className='flex gap-2'>
				<div className='flex items-center justify-center gap-1'>
					{likes.find(
						like => like.userId === currentData?.id && like.postId === id
					) ? (
						<BiSolidHeart className='cursor-pointer' onClick={unLikePost} />
					) : (
						<BiHeart className='cursor-pointer' onClick={likePost} />
					)}
					{
						likes.map(like => {
							like.postId === id;
						}).length
					}
				</div>
				<div className='flex items-center justify-center gap-1'>
					<BiComment
						onClick={() => navigate(`/posts/${id}`)}
						className='cursor-pointer'
					/>
					{
						comments.map(comment => {
							comment.postId === id;
						}).length
					}
				</div>
			</CardFooter>
		</Card>
	);
}
