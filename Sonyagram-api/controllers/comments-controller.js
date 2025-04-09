const { prisma } = require('../prisma/prisma-client');

const CommentsController = {
	createComment: async (req, res) => {
		const { postId, content } = req.body;
		const userId = req.user.userId;

		if (!content || !postId) {
			return res.status(400).json({ error: 'Все поля обязательны' });
		}

		try {
			const comment = await prisma.comment.create({
				data: {
					postId,
					userId,
					content,
				},
			});

			res.json(comment);
		} catch (error) {
			console.error('create comment error', error);
			res.error(500).json({ error: 'Internal Server Error' });
		}
	},
	deleteComment: async (req, res) => {
		const { id } = req.params;

		try {
			const comment = await prisma.comment.findUnique({
				where: { id },
			});

			if (!comment) {
				return res.status(404).json({ error: 'Такого комментария нету' });
			}

			if (comment.userId !== req.user.userId) {
				console.log(comment.userId, req.user.userId);
				return res.status(403).json({ error: 'Нет доступа' });
			}

			await prisma.comment.delete({ where: { id } });

			res.json(comment);
		} catch (error) {
			console.error('delete comment error', error);
			res.error(500).json({ error: 'Internal Server Error' });
		}
	},
};

module.exports = CommentsController;
