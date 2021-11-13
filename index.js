const { ApolloServer } = require("apollo-server");
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
	context: ({ req }) => ({ req }),
});
mongoose.connect(process.env.MONGO_URI, () => {
	console.log("Mongodb is connected");
	server.listen({ port: 5000 }).then((res) => {
		console.log(`Server running at ${res.url}`);
	});
});
