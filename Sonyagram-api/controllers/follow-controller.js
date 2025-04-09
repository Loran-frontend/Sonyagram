const { prisma } = require('../prisma/prisma-client');

const FollowController = {
	followUser: async (req, res) => {
		const { followingId } = req.body;
		const userId = req.user.userId;

		if (followingId === userId) {
			return res.status(500).json({ error: 'Нельзя подписаться на себя' });
		}

		try {
			const existingSubscription = await prisma.follows.findFirst({
				where: {
					AND: [{ followerId: userId }, { followingId }],
				},
			});

			if (existingSubscription) {
				return res.status(400).json({ error: 'Подписка уже существует' });
			}

			await prisma.follows.create({
				data: {
					follower: { connect: { id: userId } },
					following: { connect: { id: followingId } },
				},
			});

			res.status(201).json({ message: 'Подписка успешно создана' });
		} catch (error) {
			console.error('error Follow', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	unfollowUser: async (req, res) => {
		const { followingId } = req.body;
		const userId = req.user.userId;

		try {
			const follows = await prisma.follows.findFirst({
				where: {
					AND: [{ followerId: userId }, { followingId }],
				},
			});

			if (!follows) {
				return res.status(404).json({ error: 'Подписки не существует' });
			}

			await prisma.follows.delete({
				where: {
					id: follows.id,
				},
			});

			res.status(201).json({ message: 'Вы отписались' });
		} catch (error) {
			console.error('error unFollow', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
};

module.exports = FollowController;
