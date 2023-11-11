import { ApolloClient, InMemoryCache } from "@apollo/client";

// Create a appollo client
const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || "",
  cache: new InMemoryCache(),
});

export { apolloClient };
