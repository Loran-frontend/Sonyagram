import '@/styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { HeroProvider } from './components/HeroProvider';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthGuard } from './features/authGuard';
import { Auth } from './pages/auth';
import { Feed } from './pages/Feed';
import { Friends } from './pages/Friends';
import { HelpFeedback } from './pages/Help & Feedback';
import { Messages } from './pages/Messages';
import { Post } from './pages/Post';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />,
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Feed />,
			},
			{
				path: 'posts/:id',
				element: <Post />,
			},
			{
				path: 'users/:id',
				element: <Profile />,
			},
			{
				path: 'friends',
				element: <Friends />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
			{
				path: 'help',
				element: <HelpFeedback />,
			},
			{
				path: 'messages',
				element: <Messages />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<HeroProvider>
					<AuthGuard>
						<RouterProvider router={router} />
					</AuthGuard>
				</HeroProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
