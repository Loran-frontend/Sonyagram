import { selectIsAuthenticated } from '@/features/userSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../container';
import { Header } from '../Header';
import { NavBar } from '../NavBar';

export function Layout() {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/auth');
		}
	}, []);

	return (
		<>
			<Header />
			<Container>
				<div className='p-4'>
					<NavBar />
				</div>
				<div className='flex-1 p-2'>
					<Outlet />
				</div>
			</Container>
		</>
	);
}
