import ApolloClient from "apollo-boost";

const GRAPHQL_URL = "https://eu1.prisma.sh/robertistok94-3a0a6e/drone-around-the-world/dev";

const client = new ApolloClient({
  uri: GRAPHQL_URL
});

export default client;
