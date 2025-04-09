import { useAppSelector } from '@/app/hooks';
import { selectCurrent } from '@/features/userSlice';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { Chip, Input } from '@heroui/react';
import { FriendUser } from '../FriendUser';

export function FriendsUser() {
	const currentData = useAppSelector(selectCurrent);
	const sortedFollows =
		currentData?.following.map(follower => follower.following) || [];

	const { filter, setFilter, users } = useSearchUsers(sortedFollows);
	return (
		<div>
			<Input
				className='flex items-center'
				label='Поиск по друзьям'
				placeholder='Никнейм или почта'
				value={filter}
				onChange={e => setFilter(e.currentTarget.value)}
			/>
			<div className='mt-2'>
				{users.length > 0 ? (
					users?.map(follower => (
						<FriendUser
							isFollowing={
								sortedFollows?.filter(following => following.id === follower.id)
									.length === 1
							}
							user={follower}
							key={follower.id}
						/>
					))
				) : (
					<div className='flex justify-center'>
						<Chip>У вас еще нету друзей</Chip>
					</div>
				)}
			</div>
		</div>
	);
}
