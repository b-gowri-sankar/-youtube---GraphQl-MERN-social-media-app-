import React from "react";
import App from "./App";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:5000/",
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
