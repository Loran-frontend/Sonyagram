import { useAppSelector } from '@/app/hooks';
import { selectCurrent } from '@/features/userSlice';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
	const navigate = useNavigate();
	const currentData = useAppSelector(selectCurrent);

	return (
		<div className='flex flex-col gap-4'>
			<Button onPress={() => navigate('/')} variant='bordered' size='lg'>
				Лента
			</Button>
			<Button
				onPress={() => navigate(`users/${currentData?.id}`)}
				variant='bordered'
				size='lg'
			>
				Профиль
			</Button>
			<Button onPress={() => navigate('friends')} variant='bordered' size='lg'>
				Друзья
			</Button>
			<Button onPress={() => navigate('messages')} variant='bordered' size='lg'>
				Мессенджер
			</Button>
		</div>
	);
}
