const { AuthenticationError } = require("apollo-server");
const Post = require("../../modal/Post");
const checkAuth = require("../../utils/checkAuth");
module.exports = {
	Query: {
		getPosts: async () => {
			try {
				const posts = await Post.find().sort({ createdAt: -1 });
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		getPost: async (_, { postId }) => {
			try {
				const post = await Post.findOne({ _id: postId });
				if (post) {
					return post;
				} else {
					throw new Error("Post Not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createPost: async (_, { body }, context) => {
			const user = checkAuth(context);

			if (body.trim() === "") {
				throw new Error("Post body must be empty");
			}

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});
			const post = await newPost.save();
			return post;
		},
		deletePost: async (_, { postId }, context) => {
			const user = checkAuth(context);
			try {
				const post = await Post.findById(postId);

				if (user.username === post.username) {
					await post.delete();
					return "Post Deleted Successfully";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
