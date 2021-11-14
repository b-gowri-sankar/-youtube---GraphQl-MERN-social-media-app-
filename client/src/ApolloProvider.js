import React from "react";
import App from "./App";
import { setContext } from "@apollo/client/link/context";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
	createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
	uri: "http://localhost:5000/",
});

const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const ApolloProviderInstance = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
};

export default ApolloProviderInstance;
