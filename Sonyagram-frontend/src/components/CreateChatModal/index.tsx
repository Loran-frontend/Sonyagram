import { useAppSelector } from '@/app/hooks';
import {
	useCreateRoomMutation,
	useLazyGetRoomsQuery,
} from '@/app/services/messageApi';
import { useGetAllUsersQuery } from '@/app/services/userApi';
import { Room } from '@/app/types';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
	User,
} from '@heroui/react';
import { useEffect, useState } from 'react';

export function CreateChatModal({
	existingRooms,
}: {
	existingRooms: Room[] | undefined;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { data } = useGetAllUsersQuery();
	const currentData = useAppSelector(selectCurrent);
	const [createRoom] = useCreateRoomMutation();
	const [triggerRooms] = useLazyGetRoomsQuery();

	const [filteredUsers, setFilteredUsers] = useState(data);

	useEffect(() => {
		if (data && currentData && existingRooms) {
			const existingFriendIds = existingRooms
				.map(room => {
					return room.users.find(user => user.id !== currentData.id)?.id;
				})
				.filter(id => id !== undefined);

			const newFilteredUsers = data.filter(
				user =>
					user.id !== currentData.id && !existingFriendIds.includes(user.id)
			);

			setFilteredUsers(newFilteredUsers);
		}
	}, [data, currentData, existingRooms]);

	async function CreateRoom(id: string) {
		try {
			await createRoom({ friendId: id }).unwrap();
			await triggerRooms().unwrap();
		} catch (error) {
			console.error(error);
		} finally {
			onOpenChange();
		}
	}

	return (
		<>
			<Button isIconOnly onPress={onOpen}>
				+
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Пользователи
							</ModalHeader>
							<ModalBody className='flex items-start'>
								{filteredUsers && filteredUsers.length > 0 ? (
									filteredUsers.map(user => (
										<User
											key={user.id}
											name={user.name}
											description={user.email}
											avatarProps={{ src: `${BASE_URL}${user.avatarUrl}` }}
											className='cursor-pointer'
											onClick={() => {
												CreateRoom(user.id);
											}}
										/>
									))
								) : (
									<p className='p-3'>
										Нету пользователей или у вас есть чаты со всеми
										пользователями
									</p>
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
