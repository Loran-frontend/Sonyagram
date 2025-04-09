#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('express-api:server');
const http = require('http');
const { Server } = require('socket.io');
const { prisma } = require('../prisma/prisma-client');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

io.on('connect', socket => {
	const roomId = socket.request.headers.roomid;
	const authorId = socket.request.headers.authorid;

	socket.join(roomId);

	console.log('user connect ' + socket.id);

	socket.on('message', async content => {
		const message = await prisma.message.create({
			data: {
				roomId,
				authorId,
				content,
			},
		});

		const author = await prisma.user.findUnique({
			where: {
				id: authorId,
			},
		});

		if (!author) {
			console.error('Author not found!');
		}

		const messageWithAuthor = {
			...message,
			author: {
				id: author.id,
				name: author.name,
				avatarUrl: author.avatarUrl,
			},
		};

		io.to(roomId).emit('message', messageWithAuthor);
	});

	socket.on('disconnect', () => {
		console.log('user disconect ' + socket.id);
	});
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
	console.log(`server running at http://localhost:${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
