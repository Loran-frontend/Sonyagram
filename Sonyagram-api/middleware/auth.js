const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	const Token = authHeader && authHeader.split(' ')[1];

	if (!Token) {
		return res.status(401).json({ error: 'Пользователь не авторизирован' });
	}

	jwt.verify(Token, process.env.TOKEN_KEY, (err, user) => {
		if (err) {
			return res.status(403).json({ error: 'Invalid Token' });
		}

		req.user = user;

		next();
	});
};

module.exports = authenticateToken;
