import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

type Props = {
	children: React.ReactElement[] | React.ReactElement;
};

export function HeroProvider({ children }: Props) {
	return (
		<HeroUIProvider>
			<ToastProvider />
			{children}
		</HeroUIProvider>
	);
}
