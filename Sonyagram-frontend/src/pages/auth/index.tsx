import { AuthHeader } from '@/components/AuthHeader';
import { Login } from '@/features/Login';
import { Register } from '@/features/Register';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { useState } from 'react';

export function Auth() {
	const [selected, setSelected] = useState('Login');

	return (
		<div>
			<AuthHeader />
			<div className='h-full flex justify-center pt-20'>
				<Card className='w-[400px] h-[450px]'>
					<CardBody className='overflow-hidden'>
						<Tabs
							fullWidth
							color='default'
							size='md'
							selectedKey={selected}
							onSelectionChange={key => setSelected(key as string)}
						>
							<Tab key='Login' title='Войти'>
								<Login />
							</Tab>
							<Tab key='Register' title='Зарегистрироваться'>
								<Register setSelected={setSelected} />
							</Tab>
						</Tabs>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
