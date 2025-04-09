export type User = {
	id: string;
	email: string;
	password: string;
	name: string;
	avatarUrl: string;
	dateOfBirth: Date;
	createdAt: Date;
	updatedAt: Date;
	bio?: string;
	location?: string;
	posts: Post[];
	likes: Like[];
	comments: Comment[];
	followers: Follows[];
	following: Follows[];
};

export type Follows = {
	id: string;
	follower: User;
	followerId: string;
	following: User;
	followingId: string;
};

export type Comment = {
	id: string;
	content: string;
	User: User;
	userId: string;
	post: Post;
	postId: string;
};

export type Like = {
	id: string;
	user: User;
	userId: string;
	post: Post;
	postId: string;
};

export type Post = {
	id: string;
	content: string;
	author: User;
	authorId: string;
	likes: Like[];
	comments: Comment[];
	createdAt: Date;
};

export type Message = {
	id: string;
	content: string;
	author: User;
	room: Room;
	roomId: string;
	authorId: string;
	createdAt: Date;
};

export type Room = {
	id: string;
	messages: Message[];
	createdAt: Date;
	users: User[];
	userIds: string[];
};
