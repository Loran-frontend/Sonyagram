import { useLazyCurrentQuery, useLoginMutation } from '@/app/services/userApi';
import { Input } from '@/components/Input';
import { addToast, Button } from '@heroui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Inputs = {
	email: string;
	password: string;
};

type ErrorAuth = {
	data: string;
	status: number;
};

export function Login() {
	const { control, handleSubmit } = useForm<Inputs>();
	const [login] = useLoginMutation();
	const [triggerCurrentQuery] = useLazyCurrentQuery();
	const navigate = useNavigate();

	const onsubmit: SubmitHandler<Inputs> = async data => {
		try {
			await login(data).unwrap();
			await triggerCurrentQuery().unwrap();
			navigate('/');
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
				type='email'
				name='email'
				label='Электронная почта'
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
			<Button type='submit'>Войти</Button>
		</form>
	);
}
