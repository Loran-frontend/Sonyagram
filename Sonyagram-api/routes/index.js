const express = require('express');
const multer = require('multer');
const {
	UserController,
	PostController,
	CommentsController,
	LikeController,
	FollowController,
} = require('../controllers');
const authenticateToken = require('../middleware/auth');
const { MessageController } = require('../controllers/message-controller');

const router = express.Router();

const storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const uploads = multer({ storage: storage });

// Роуты пользователя
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserByID);
router.put('/users/:id', authenticateToken, UserController.updateUser);
router.get('/users', authenticateToken, UserController.getAllUsers);

// Роуты Постов
router.post('/posts', authenticateToken, PostController.createPost);
router.get('/posts', authenticateToken, PostController.getAllPosts);
router.get('/posts/:id', authenticateToken, PostController.getPostById);
router.delete('/posts/:id', authenticateToken, PostController.deletePost);

// Роуты комментариев
router.post('/comments', authenticateToken, CommentsController.createComment);
router.delete(
	'/comments/:id',
	authenticateToken,
	CommentsController.deleteComment
);

// Роуты лайков
router.post('/likes', authenticateToken, LikeController.likePost);
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost);

// Роуты подписки
router.post('/follow', authenticateToken, FollowController.followUser);
router.delete('/unfollow', authenticateToken, FollowController.unfollowUser);

router.post('/rooms', authenticateToken, MessageController.createRoom);
router.get('/rooms', authenticateToken, MessageController.getRooms);

module.exports = router;
