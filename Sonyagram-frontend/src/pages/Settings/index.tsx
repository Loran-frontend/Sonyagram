import { UserSettings } from '@/components/UserSettings';
import { Card, CardBody } from '@heroui/react';

export function Settings() {
	return (
		<div className='h-full flex justify-center items-center'>
			<Card className='max-w-full w-full h-[500px]'>
				<CardBody className='overflow-hidden'>
					<UserSettings />
				</CardBody>
			</Card>
		</div>
	);
}
