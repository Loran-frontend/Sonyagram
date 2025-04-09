import { useAppSelector } from '@/app/hooks';
import { useGetRoomsQuery } from '@/app/services/messageApi';
import { Chat } from '@/components/Chat';
import { CreateChatModal } from '@/components/CreateChatModal';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { Card, CardBody, CardHeader, Chip, Input, User } from '@heroui/react';
import { useState } from 'react';

export function Messages() {
	const [chat, setChat] = useState('');
	const { data } = useGetRoomsQuery();
	const currentData = useAppSelector(selectCurrent);
	const filterData =
		data?.map(room => {
			return room.users.filter(user => user.id !== currentData?.id)[0];
		}) || [];
	const messages = data?.filter(room => {
		if (room.userIds.filter(id => id !== currentData?.id).includes(chat)) {
			return room;
		}
	})[0];

	const { filter, setFilter, users } = useSearchUsers(filterData);

	return (
		<div className='flex gap-2 max-w-screen-xl mx-auto'>
			<div className='flex-[1]'>
				<Card>
					<CardHeader className='flex gap-1'>
						<Input
							value={filter}
							onChange={e => setFilter(e.currentTarget.value)}
							label='Поиск по чатам'
							placeholder='Никнейм или почта'
						/>
						<CreateChatModal existingRooms={data} />
					</CardHeader>
					<CardBody className='flex items-start gap-3 p-3'>
						{users?.map(user => (
							<User
								key={user.id}
								className='cursor-pointer'
								name={user.name}
								description={user.email}
								avatarProps={{ src: `${BASE_URL}${user.avatarUrl}` }}
								onClick={() => setChat(user.id)}
							/>
						))}
					</CardBody>
				</Card>
			</div>
			<div className='flex-[3]'>
				{chat ? (
					<Chat
						messages={messages?.messages}
						roomid={messages?.id}
						user={users?.filter(user => user.id === chat)[0]}
					/>
				) : (
					<div className='h-full flex justify-center'>
						<Chip variant='bordered'>Выберите чат</Chip>
					</div>
				)}
			</div>
		</div>
	);
}
