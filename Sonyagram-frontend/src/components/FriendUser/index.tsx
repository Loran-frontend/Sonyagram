import {
	useFollowUserMutation,
	useUnfollowUserMutation,
} from '@/app/services/followApi';
import { useLazyCurrentQuery } from '@/app/services/userApi';
import { User as typeUser } from '@/app/types';
import { BASE_URL } from '@/constants';
import { Button, User } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export function FriendUser({
	user,
	isFollowing,
}: {
	user: typeUser;
	isFollowing: boolean;
}) {
	const [follow] = useFollowUserMutation();
	const [unfollow] = useUnfollowUserMutation();
	const navigate = useNavigate();
	const [triggerCurrent] = useLazyCurrentQuery();

	const onFollowing = async (id: string) => {
		try {
			await follow({ followingId: id }).unwrap();
			triggerCurrent().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	const onUnFollowing = async (id: string) => {
		try {
			await unfollow({ followingId: id }).unwrap();
			triggerCurrent().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex justify-between items-center p-2'>
			<User
				avatarProps={{
					src: `${BASE_URL}${user.avatarUrl}`,
				}}
				description={user.email}
				name={
					<p
						onClick={() => navigate(`/users/${user.id}`)}
						className='hover:underline cursor-pointer'
					>
						{user.name}
					</p>
				}
			/>
			{isFollowing ? (
				<Button
					variant='ghost'
					onPress={() => {
						onUnFollowing(user.id);
					}}
				>
					Удалить из друзей
				</Button>
			) : (
				<Button
					onPress={() => {
						onFollowing(user.id);
					}}
				>
					Добавить в друзья
				</Button>
			)}
		</div>
	);
}
