import {
	Button,
	Image,
	Navbar,
	NavbarBrand,
	NavbarContent,
} from '@heroui/react';
import { useContext } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeProvider';

export function AuthHeader() {
	const { toggleTheme, theme } = useContext(ThemeContext);

	return (
		<Navbar className='border-b-2 border-default-100 shadow-sm fixed z-50 top-0 bg-background'>
			<NavbarBrand>
				<Link to='/'>
					<Image
						src={theme === 'light' ? 'light-logo.svg' : 'dark-logo.svg'}
						width={100}
					/>
				</Link>
			</NavbarBrand>
			<NavbarContent></NavbarContent>
			<Button
				color='secondary'
				onPress={toggleTheme}
				variant='ghost'
				isIconOnly
				size='sm'
			>
				{theme === 'dark' ? <BiMoon /> : <BiSun />}
			</Button>
		</Navbar>
	);
}
