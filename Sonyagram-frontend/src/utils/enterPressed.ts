export function enterPressed(
	event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
	cb: (value?: any) => void,
	value?: any
) {
	const key = event.key;
	if (key === 'Enter') {
		cb(value);
	}
}
