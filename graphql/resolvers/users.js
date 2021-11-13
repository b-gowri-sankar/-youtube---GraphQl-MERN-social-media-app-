const User = require("../../modal/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	Mutation: {
		register: async (
			_,
			{ registerInput: { username, email, password, confirmPassword } },
			context,
			info
		) => {
			//Todo validate user data
			//Todo: make sure user doesn't exist
			//TODO: has password and created authentication token

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = jwt.sign(
				{
					id: res._id,
					email: res.email,
					username: res.username,
				},
				process.env.SECRET_KEY,
				{ expiresIn: "1d" }
			);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
