import { FriendsUser } from '@/components/FriendsUser';
import { Users } from '@/components/Users';
import { Card, CardBody, Divider, Tab, Tabs } from '@heroui/react';
import { useState } from 'react';

export function Friends() {
	const [selected, setSelected] = useState('userFriends');

	return (
		<div>
			<Card className='mx-auto w-[800px]'>
				<Divider />
				<CardBody>
					<Tabs
						fullWidth
						color='default'
						size='md'
						selectedKey={selected}
						onSelectionChange={key => setSelected(key as string)}
					>
						<Tab key='userFriends' title='Друзья'>
							<FriendsUser />
						</Tab>
						<Tab key='allUsers' title='Все пользователи'>
							<Users />
						</Tab>
					</Tabs>
				</CardBody>
			</Card>
		</div>
	);
}
