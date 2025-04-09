import { useAppSelector } from '@/app/hooks';
import { useCreateCommentMutation } from '@/app/services/commentApi';
import {
	useLikePostMutation,
	useUnlikePostMutation,
} from '@/app/services/likeApi';
import {
	useGetPostByIdQuery,
	useLazyGetPostByIdQuery,
} from '@/app/services/postApi';
import { CardComment } from '@/components/CardComment';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import { formatToClientDate } from '@/utils/data-format';
import { enterPressed } from '@/utils/enterPressed';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Divider,
	Image,
	Textarea,
} from '@heroui/react';
import { useState } from 'react';
import { BiComment, BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

export function Post() {
	const [text, setText] = useState('');
	const params = useParams<{ id: string }>();
	const currentData = useAppSelector(selectCurrent);
	const { data } = useGetPostByIdQuery(params?.id ?? '');
	const [createComment] = useCreateCommentMutation();
	const [like] = useLikePostMutation();
	const [unLike] = useUnlikePostMutation();
	const [triggerPost] = useLazyGetPostByIdQuery();

	if (!data) {
		return (
			<div className='flex justify-center my-16'>
				<Chip>Такого поста не существует</Chip>
			</div>
		);
	}

	const likePost = async () => {
		try {
			await like({ postId: data.id }).unwrap();
			await triggerPost(params?.id ?? '').unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	const unLikePost = async () => {
		try {
			await unLike({ id: data.id }).unwrap();
			await triggerPost(params?.id ?? '').unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	const onsubmit = async () => {
		try {
			await createComment({ postId: data.id, content: text }).unwrap();
			setText('');
			await triggerPost(params?.id ?? '').unwrap();
		} catch (error) {}
	};

	return (
		<div className='flex flex-col gap-3'>
			<Card>
				<CardHeader className='flex gap-3'>
					<Image
						className='rounded-full bg-default'
						height={40}
						width={40}
						radius='sm'
						src={`${BASE_URL}${data.author?.avatarUrl}`}
					/>
					<div className='flex flex-col'>
						<p className='text-md'>{data.author?.name}</p>
						<p className='text-small text-default-500'>
							{formatToClientDate(data.createdAt)}
						</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<p>{data.content}</p>
				</CardBody>
				<Divider />
				<CardFooter className='flex gap-2'>
					<div className='flex items-center justify-center gap-1'>
						{data.likes.find(
							like => like.userId === currentData?.id && like.postId === data.id
						) ? (
							<BiSolidHeart className='cursor-pointer' onClick={unLikePost} />
						) : (
							<BiHeart className='cursor-pointer' onClick={likePost} />
						)}
						{
							data.likes.map(like => {
								like.postId === data.id;
							}).length
						}
					</div>
					<div className='flex items-center justify-center gap-1'>
						<BiComment className='cursor-pointer' />
						{
							data.comments.map(comment => {
								comment.postId === data.id;
							}).length
						}
					</div>
				</CardFooter>
			</Card>
			<div className='flex flex-col'>
				<div className='flex flex-col items-center mx-auto'>
					<Textarea
						value={text}
						onChange={e => setText(e.currentTarget.value)}
						placeholder='Ваш комментарий'
						className='w-[500px]'
						onKeyDown={e => enterPressed(e, onsubmit)}
					/>
					<Button className='w-40 my-3' onPress={onsubmit}>
						Опубликовать
					</Button>
				</div>

				{data.comments.map(comment => (
					<CardComment
						User={comment.User}
						content={comment.content}
						id={comment.id}
						key={comment.id}
						postId={comment.postId}
					/>
				))}
			</div>
		</div>
	);
}
