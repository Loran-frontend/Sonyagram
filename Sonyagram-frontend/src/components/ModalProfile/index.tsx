import { useGetUserByIDQuery } from '@/app/services/userApi';
import { formatToClientDate } from '@/utils/data-format';
import {
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';
import { BiInfoCircle } from 'react-icons/bi';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import { GoGift } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useParams } from 'react-router-dom';

export function ModalProfile() {
	const params = useParams<{ id: string }>();
	const { data } = useGetUserByIDQuery(params?.id ?? '');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<p
				className='flex items-center gap-1 cursor-pointer hover:underline text-sm'
				onClick={onOpen}
			>
				<BiInfoCircle />
				Подробнее
			</p>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Подробная информация
						</ModalHeader>
						<Divider />
						<ModalBody>
							<p className='flex items-center gap-2'>
								<RxHamburgerMenu />
								{data?.bio ? data?.bio : ' missing'}
							</p>
							<p className='flex items-center gap-2'>
								<MdEmail /> {data?.email}
							</p>
							<p className='flex items-center gap-2'>
								<GoGift />
								Дата рождения:
								{formatToClientDate(data?.dateOfBirth, true) === ''
									? ' missing'
									: ' ' + formatToClientDate(data?.dateOfBirth, true)}
							</p>
							<p className='flex items-center gap-2'>
								<FaFontAwesomeFlag />
								Страна: {data?.location ? data?.location : ' missing'}
							</p>
						</ModalBody>
					</>
				</ModalContent>
			</Modal>
		</>
	);
}
