import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { BASE_URL } from '@/constants';
import { logout, selectCurrent } from '@/features/userSlice';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	User,
} from '@heroui/react';
import { Key } from 'react';
import { useNavigate } from 'react-router-dom';

export function DropDown() {
	const current = useAppSelector(selectCurrent);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const hadleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/auth');
	};

	const dropDownNavigate = (key: Key) => {
		switch (key) {
			case 'profile':
				navigate(`users/${current?.id}`);
				break;
			case 'settings':
				navigate('settings');
				break;
			case 'help_and_feedback':
				navigate('help');
				break;
			case 'logout':
				hadleLogout();
				break;
		}
	};

	return (
		<Dropdown placement='bottom-start'>
			<DropdownTrigger>
				<User
					as='button'
					avatarProps={{
						isBordered: true,
						src: `${BASE_URL}${current?.avatarUrl}`,
					}}
					className='transition-transform'
					description={current?.email}
					name={current?.name}
				/>
			</DropdownTrigger>
			<DropdownMenu
				aria-label='User Actions'
				onAction={key => dropDownNavigate(key)}
			>
				<DropdownItem key='profile'>Профиль</DropdownItem>
				<DropdownItem key='settings'>Настройки</DropdownItem>
				<DropdownItem key='help_and_feedback'>
					Помощь и обратная связь
				</DropdownItem>
				<DropdownItem key='logout' color='danger'>
					Выйти
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
