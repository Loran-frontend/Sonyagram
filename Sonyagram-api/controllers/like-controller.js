const { prisma } = require('../prisma/prisma-client');

const LikeController = {
	likePost: async (req, res) => {
		const { postId } = req.body;
		const userId = req.user.userId;

		if (!postId) {
			res.status(400).json({ error: 'Все поля обязательны' });
		}

		try {
			const existingLike = await prisma.like.findFirst({
				where: { postId, userId },
			});

			if (existingLike) {
				return res.status(400).json({ error: 'Вы уже поставили лайк' });
			}

			const like = await prisma.like.create({
				data: { postId, userId },
			});

			res.json(like);
		} catch (error) {
			console.error('error likePost', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	unlikePost: async (req, res) => {
		const { id } = req.params;
		const userId = req.user.userId;

		if (!id) {
			return res.status(400).json({ error: 'Вы уже поставили дизлайк' });
		}

		try {
			console.log(id, userId);

			const exitingLike = await prisma.like.findFirst({
				where: { postId: id, userId },
			});

			if (!exitingLike) {
				return res.status(404).json({ error: 'Нельзя поставить дизлайк' });
			}

			const like = await prisma.like.deleteMany({
				where: { postId: id, userId },
			});

			res.json(like);
		} catch (error) {}
	},
};

module.exports = LikeController;
