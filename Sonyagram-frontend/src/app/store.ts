import { listenerMiddleware } from '@/middleware/auth';
import { configureStore } from '@reduxjs/toolkit';
import user from '../features/userSlice';
import { Api } from './services/api';

export const store = configureStore({
	reducer: {
		[Api.reducerPath]: Api.reducer,
		user,
	},
	middleware: getDefaulyMiddlewere =>
		getDefaulyMiddlewere()
			.concat(Api.middleware)
			.prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
