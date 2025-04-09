import { useAppSelector } from '@/app/hooks';
import { useLazyGetRoomsQuery } from '@/app/services/messageApi';
import { Message as typeMessage, User as typeUser } from '@/app/types';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/userSlice';
import { enterPressed } from '@/utils/enterPressed';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Divider,
	Input,
	User,
} from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import { GoPaperAirplane } from 'react-icons/go';
import { io, Socket } from 'socket.io-client';
import { Message } from '../Message';
import { ScrollToBottom } from '../ScrollToButtom';

type Props = {
	messages: typeMessage[] | undefined;
	roomid: string | undefined;
	user: typeUser | undefined;
};

export function Chat({ messages, roomid, user }: Props) {
	const [value, setValue] = useState('');
	const [actMessage, setActMessage] = useState<typeMessage[]>(messages || []);
	const socketRef = useRef<Socket>();
	const chatBodyRef = useRef<HTMLDivElement>(null);
	const currentData = useAppSelector(selectCurrent);
	const [triggerRooms] = useLazyGetRoomsQuery();

	async function createMessage(text: string) {
		socketRef.current?.emit('message', text);
		setValue('');
	}

	socketRef.current?.on('message', msg => {
		setActMessage([...actMessage, msg]);
	});

	useEffect(() => {
		if (chatBodyRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;

			if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 116) {
				chatBodyRef.current.scrollTo({
					top: scrollHeight,
				});
			}
		}
	}, [actMessage]);

	useEffect(() => {
		triggerRooms();
		setActMessage(messages || []);
	}, [messages]);

	useEffect(() => {
		socketRef.current = io('ws://localhost:12345', {
			extraHeaders: {
				roomid: roomid || '',
				authorid: currentData?.id || '',
			},
		});

		return () => {
			socketRef.current?.disconnect();
		};
	}, [roomid]);

	return (
		<Card>
			<CardHeader className='flex flex-col items-start gap-5'>
				<User
					name={user?.name}
					description={user?.email}
					avatarProps={{
						src: `${BASE_URL}${user?.avatarUrl}`,
					}}
				/>
				<Divider />
			</CardHeader>
			<CardBody>
				<div
					className='flex flex-col gap-2 h-[465px] overflow-y-auto p-2'
					ref={chatBodyRef}
				>
					{actMessage.length > 0 ? (
						actMessage?.map(msg => (
							<>
								<Message
									content={msg.content}
									author={msg.author}
									isMine={msg.authorId === currentData?.id}
									time={msg.createdAt}
									key={msg.id}
								/>
								<ScrollToBottom />
							</>
						))
					) : (
						<div className='flex h-full justify-center items-center'>
							<Chip>Сообщений нету</Chip>
						</div>
					)}
				</div>
			</CardBody>
			<CardFooter>
				<Input
					size='lg'
					value={value}
					onChange={e => setValue(e.currentTarget.value)}
					onKeyDown={e => enterPressed(e, createMessage, value)}
					endContent={
						<Button isIconOnly onPress={() => createMessage(value)}>
							<GoPaperAirplane />
						</Button>
					}
				/>
			</CardFooter>
		</Card>
	);
}
