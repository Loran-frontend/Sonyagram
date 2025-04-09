import { useAppSelector } from '@/app/hooks';
import {
	useLazyCurrentQuery,
	useUpdateUserMutation,
} from '@/app/services/userApi';
import { selectCurrent } from '@/features/userSlice';
import { Button } from '@heroui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../Input';

type Inputs = {
	name: string;
	bio: string;
	dateOfBirth: Date;
	location: string;
	email: string;
};

export function UserSettings() {
	const { control, handleSubmit } = useForm<Inputs>();
	const currentData = useAppSelector(selectCurrent);
	const [update] = useUpdateUserMutation();
	const [updatecurrent] = useLazyCurrentQuery();

	const onsubmit: SubmitHandler<Inputs> = async data => {
		try {
			if (currentData) {
				await update({
					id: currentData.id,
					...data,
					dateOfBirth: data.dateOfBirth
						? new Date(data.dateOfBirth).toISOString()
						: '',
				}).unwrap();
				await updatecurrent().unwrap();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form className='flex flex-col gap-2' onSubmit={handleSubmit(onsubmit)}>
			<Input
				control={control}
				name='name'
				label='Никнейм'
				placeholder='Введите ваш никнейм'
				defaultValue={currentData?.name}
			/>
			<Input
				control={control}
				name='bio'
				label='О себе'
				placeholder='Введите информацию о себе'
				defaultValue={currentData?.bio}
			/>
			<Input
				control={control}
				name='location'
				label='Страна'
				placeholder='Ваша страна'
				defaultValue={currentData?.location}
			/>
			<Input
				control={control}
				name='dateOfBirth'
				label='Дата рождения'
				type='date'
			/>
			<Button type='submit'>Сохранить</Button>
		</form>
	);
}
