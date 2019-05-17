import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Post from "./Post";
import Loader from "./Loader";

const GET_POSTS_QUERY = gql`
  query GET_POSTS_QUERY {
    posts {
      id
      shortcode
      mediaPath
      captionForFacebook
      isPublished
    }
  }
`;

const ListPosts = () => {
  return (
    <Query query={GET_POSTS_QUERY}>
      {({ data: { posts }, loading }) => {
        console.log(posts, loading);

        if (loading) {
          return <Loader />;
        }

        return (
          <Root>
            {posts.map(post => (
              <Post key={post.id} {...post} />
            ))}
          </Root>
        );
      }}
    </Query>
  );
};

const Root = styled.section`
  margin: 10px 30px;
`;

export default ListPosts;
