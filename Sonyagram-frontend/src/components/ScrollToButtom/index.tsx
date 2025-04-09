import { useEffect, useRef } from 'react';

export const ScrollToBottom = () => {
	const elementRef = useRef<HTMLDivElement>(null);
	useEffect(
		() =>
			elementRef.current?.scrollIntoView({
				block: 'end',
				inline: 'nearest',
			}),
		[]
	);
	return <div ref={elementRef} />;
};
