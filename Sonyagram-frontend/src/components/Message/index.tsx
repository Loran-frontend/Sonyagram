import { User as typeUser } from '@/app/types';
import { BASE_URL } from '@/constants';
import { formatToClientDate } from '@/utils/data-format';
import { Card, CardBody, User } from '@heroui/react';
import clsx from 'clsx';

type Props = {
	content: string;
	author: typeUser;
	time: Date;
	isMine: boolean;
};

export function Message({ content, author, isMine, time }: Props) {
	return (
		<Card className='min-h-min'>
			<CardBody
				className={clsx('overflow-clip', isMine ? 'items-end' : 'items-start')}
			>
				<User
					name={author.name}
					avatarProps={{
						src: `${BASE_URL}${author.avatarUrl}`,
					}}
				/>
				<p className='max-w-[730px] text-balance'>{content}</p>
				<p className='text-sm text-gray-500'>{formatToClientDate(time)}</p>
			</CardBody>
		</Card>
	);
}
