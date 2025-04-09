const jdenticon = require('jdenticon');
const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const UserController = {
	register: async (req, res) => {
		const { password, name, email } = req.body;

		if (!password | !name | !email) {
			return res.status(400).json('not password or name or email');
		}

		try {
			const existingUser = await prisma.user.findUnique({ where: { email } });
			if (existingUser) {
				return res.status(400).json('Пользователь уже существует');
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const png = jdenticon.toPng(`${name}${Date.now()}`, 200);
			const AvatarName = `${name}_${Date.now()}.png`;
			const AvatarPath = path.join(__dirname, '../uploads', AvatarName);
			fs.writeFileSync(AvatarPath, png);

			const user = await prisma.user.create({
				data: {
					name,
					password: hashedPassword,
					email,
					avatarUrl: `/uploads/${AvatarName}`,
				},
			});

			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	login: async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) {
				return res.status(400).json('Неверный логин или пароль');
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				return res.status(400).json('Неверный логин или пароль');
			}

			const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY);

			res.json(token);
		} catch (error) {
			console.error('login error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	getUserByID: async (req, res) => {
		const { id } = req.params;
		const userId = req.user.userId;

		try {
			const user = await prisma.user.findUnique({
				where: { id },
				include: {
					followers: true,
					following: true,
				},
			});

			if (!user) {
				return res.status(404).json({ error: 'Пользователь не найден' });
			}

			const isFollowing = await prisma.follows.findFirst({
				where: {
					AND: [{ followerId: userId }, { followingId: id }],
				},
			});

			res.json({ ...user, isFollowing: Boolean(isFollowing) });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	updateUser: async (req, res) => {
		const { id } = req.params;
		const { email, name, bio, location, dateOfBirth } = req.body;

		let FilePath;

		if (req.file && req.file.path) {
			FilePath == req.file.path;
		}

		if (id !== req.user.userId) {
			return res.status(403).json({ error: 'Нет доступа' });
		}

		try {
			if (email) {
				const exitingUser = await prisma.user.findFirst({
					where: { email },
				});

				if (exitingUser && exitingUser.id !== id) {
					return res.status(400).json({ error: 'почта уже занята' });
				}
			}

			const user = await prisma.user.update({
				where: { id },
				data: {
					email: email || undefined,
					name: name || undefined,
					bio: bio || undefined,
					location: location || undefined,
					dateOfBirth: dateOfBirth || undefined,
					avatarUrl: FilePath ? `/${FilePath}` : undefined,
				},
			});

			res.json(user);
		} catch (error) {
			console.error('update error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	current: async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: req.user.userId,
				},
				include: {
					followers: {
						include: {
							follower: true,
						},
					},
					following: {
						include: {
							following: true,
						},
					},
				},
			});

			if (!user) {
				return res.status(400).json({ error: 'Не удалось найти пользователя' });
			}

			res.json(user);
		} catch (error) {
			console.error('Get currrent error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	getAllUsers: async (req, res) => {
		try {
			const users = await prisma.user.findMany({
				include: {
					followers: {
						include: {
							follower: true,
						},
					},
					following: {
						include: {
							following: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			if (!users) {
				return res
					.status(400)
					.json({ error: 'Не удалось найти пользователей' });
			}

			res.json(users);
		} catch (error) {
			console.error('Get users error', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
};

module.exports = UserController;
