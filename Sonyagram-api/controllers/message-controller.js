const { prisma } = require('../prisma/prisma-client');

const MessageController = {
	createRoom: async (req, res) => {
		const userId = req.user.userId;
		const { friendId } = req.body;

		const isFriend = prisma.user.findFirst({
			where: { friendId },
		});

		if (!isFriend) {
			return res.status(404).json({ error: 'Пользователь не найден' });
		}

		try {
			const room = await prisma.room.create({
				data: {
					userIds: [userId, friendId],
				},
			});

			res.json(room);
		} catch (error) {
			console.log('createRoom error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	getRooms: async (req, res) => {
		const userId = req.user.userId;

		try {
			const rooms = await prisma.room.findMany({
				where: {
					userIds: {
						has: userId,
					},
				},
				include: {
					users: true,
					messages: {
						include: {
							author: true,
							room: true,
						},
					},
				},
			});

			res.json(rooms);
		} catch (error) {
			console.log('getRoom error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
};

module.exports = { MessageController };
