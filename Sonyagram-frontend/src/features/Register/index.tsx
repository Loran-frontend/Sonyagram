import { useRegisterMutation } from '@/app/services/userApi';
import { Input } from '@/components/Input';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
	name: string;
	email: string;
	password: string;
};

type ErrorAuth = {
	data: string;
	status: number;
};

export function Register({
	setSelected,
}: {
	setSelected: (arg: string) => void;
}) {
	const { control, handleSubmit } = useForm<Inputs>();
	const [register] = useRegisterMutation();

	const onsubmit: SubmitHandler<Inputs> = async data => {
		try {
			await register(data).unwrap();
			addToast({
				title: 'Регистрация успешна',
				color: 'success',
				timeout: 3000,
			});
			setSelected('Login');
		} catch (error) {
			addToast({
				title: `Error ${(error as ErrorAuth).status}`,
				description: (error as ErrorAuth).data,
				color: 'danger',
				timeout: 3000,
				shouldShowTimeoutProgress: true,
			});
		}
	};

	return (
		<form
			className='w-full flex flex-col gap-4'
			onSubmit={handleSubmit(onsubmit)}
		>
			<Input
				control={control}
				name='name'
				label='Никнейм'
				required
				size='md'
				placeholder='Введите свой никнейм'
			/>
			<Input
				control={control}
				type='email'
				name='email'
				label='Почта'
				required
				size='md'
				placeholder='Введите свою почту'
			/>
			<Input
				control={control}
				type='password'
				name='password'
				label='Пароль'
				required
				size='md'
				placeholder='Введите пароль'
			/>
			<Button type='submit'>Зарегистрироваться</Button>
		</form>
	);
}
