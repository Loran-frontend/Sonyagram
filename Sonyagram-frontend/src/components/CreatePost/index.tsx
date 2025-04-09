import {
	useCreatePostMutation,
	useLazyGetAllPostsQuery,
} from '@/app/services/postApi';
import { enterPressed } from '@/utils/enterPressed';
import { Button, Textarea } from '@heroui/react';
import { useState } from 'react';
import { GoPencil } from 'react-icons/go';

export function CreatePost() {
	const [text, setText] = useState('');
	const [createPost] = useCreatePostMutation();
	const [triggerPosts] = useLazyGetAllPostsQuery();

	const onsubmit = async () => {
		try {
			await createPost({ content: text }).unwrap();
			setText('');
			await triggerPosts().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='ml-5 mr-60'>
			<Textarea
				className='max-w-xs mb-2'
				placeholder='Что хотите написать?'
				value={text}
				onChange={e => setText(e.currentTarget.value)}
				onKeyDown={e => enterPressed(e, onsubmit)}
			/>
			<Button onPress={onsubmit}>
				<GoPencil />
				Опубликовать
			</Button>
		</div>
	);
}
