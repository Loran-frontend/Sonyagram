import { useAppSelector } from '@/app/hooks';
import { useGetAllUsersQuery } from '@/app/services/userApi';
import { selectCurrent } from '@/features/userSlice';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { Input } from '@heroui/react';
import { FriendUser } from '../FriendUser';

export function Users() {
	const { data } = useGetAllUsersQuery();
	const currentData = useAppSelector(selectCurrent);
	const sortedFollows =
		currentData?.following.map(follower => follower.following) || [];
	const notCurrentUsers =
		data?.filter(user => user.id !== currentData?.id) || [];
	const { filter, setFilter, users } = useSearchUsers(notCurrentUsers);

	return (
		<div>
			<Input
				className='flex items-center'
				label='Поиск по друзьям'
				placeholder='Никнейм или почта'
				value={filter}
				onChange={e => setFilter(e.currentTarget.value)}
			/>
			{users.map(user => (
				<FriendUser
					isFollowing={
						sortedFollows?.filter(following => following.id === user.id)
							.length === 1
					}
					user={user}
					key={user.id}
				/>
			))}
		</div>
	);
}
