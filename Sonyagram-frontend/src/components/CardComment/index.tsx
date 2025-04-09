import { useAppSelector } from '@/app/hooks';
import { useDeleteCommentMutation } from '@/app/services/commentApi';
import { useLazyGetPostByIdQuery } from '@/app/services/postApi';
import { User } from '@/app/types';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import { Card, CardBody, CardHeader, Image } from '@heroui/react';
import { BiTrash } from 'react-icons/bi';

type Props = {
	User: User;
	content: string;
	id: string;
	postId: string;
};

export function CardComment({ User, content, id, postId }: Props) {
	const [deleteComment] = useDeleteCommentMutation();
	const [triggerComment] = useLazyGetPostByIdQuery();
	const currentData = useAppSelector(selectCurrent);

	const ondelete = async () => {
		try {
			await deleteComment({ id }).unwrap();
			await triggerComment(postId).unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card>
			<CardHeader className='flex justify-between gap-3'>
				<div className='flex items-center gap-2'>
					<Image
						className='bg-default rounded-full'
						height={40}
						width={40}
						radius='sm'
						src={`${BASE_URL}${User?.avatarUrl}`}
					/>
					<div className='flex flex-col'>
						<p className='text-md'>{User?.name}</p>
					</div>
				</div>
				{currentData?.id === User.id ? (
					<BiTrash className='cursor-pointer' onClick={ondelete} />
				) : (
					''
				)}
			</CardHeader>
			<CardBody>
				<p>{content}</p>
			</CardBody>
		</Card>
	);
}
