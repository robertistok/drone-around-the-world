import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import ListPosts from "./components/ListPosts";

import client from "./graphql";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ListPosts />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
