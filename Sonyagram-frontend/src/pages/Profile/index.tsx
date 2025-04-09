import { useAppSelector } from '@/app/hooks';
import { useGetUserByIDQuery } from '@/app/services/userApi';
import { ModalProfile } from '@/components/ModalProfile';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import { Button, Card, CardBody, Chip, Image } from '@heroui/react';
import { useNavigate, useParams } from 'react-router-dom';

export function Profile() {
	const params = useParams<{ id: string }>();
	const { data } = useGetUserByIDQuery(params?.id ?? '');
	const currentData = useAppSelector(selectCurrent);
	const navigate = useNavigate();

	if (!data) {
		return (
			<div className='flex justify-center my-16'>
				<Chip>Такого пользователя не существует</Chip>
			</div>
		);
	}

	return (
		<div>
			<Card>
				<CardBody className='p-6 flex flex-row justify-between items-center'>
					<div className='flex'>
						<Image
							className='bg-default rounded-full'
							src={`${BASE_URL}${data?.avatarUrl}`}
						/>
						<div className='w-40 p-4 flex flex-col gap-1'>
							<p className='text-xl'>{data?.name}</p>
							<p className='text-sm'>{data?.bio}</p>
							<ModalProfile />
						</div>
					</div>
					{data.id === currentData?.id ? (
						<Button onPress={() => navigate('/settings')}>
							Редактировать профиль
						</Button>
					) : (
						''
					)}
				</CardBody>
			</Card>
		</div>
	);
}
