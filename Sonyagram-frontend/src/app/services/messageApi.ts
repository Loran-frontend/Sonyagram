import { Room } from '../types';
import { Api } from './api';

export const messageApi = Api.injectEndpoints({
	endpoints: build => ({
		createRoom: build.mutation<Room, { friendId: string }>({
			query: roomData => ({
				url: '/rooms',
				method: 'POST',
				body: roomData,
			}),
		}),
		getRooms: build.query<Room[], void>({
			query: data => ({
				url: `/rooms`,
				method: 'GET',
				body: data,
			}),
		}),
	}),
});

export const { useCreateRoomMutation, useGetRoomsQuery, useLazyGetRoomsQuery } =
	messageApi;
