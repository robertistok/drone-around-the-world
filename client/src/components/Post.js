import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import DesktopMac from "@material-ui/icons/DesktopMac";
import Person from "@material-ui/icons/Person";

import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

const remote = window.require("electron").remote;
const shell = remote.shell;

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: ID!, $captionForFacebook: String, $isPublished: Boolean) {
    updatePost(
      where: { id: $id }
      data: { captionForFacebook: $captionForFacebook, isPublished: $isPublished }
    ) {
      id
      captionForFacebook
      isPublished
    }
  }
`;

const Post = ({ mediaPath, captionForFacebook, id, isPublished }) => {
  const updatePost = useMutation(UPDATE_POST_MUTATION);

  const handleInputChange = event => {
    event.persist();

    updatePost({
      variables: { id, [event.target.name]: event.target.value || event.target.checked }
    });
  };

  return (
    <Grid container spacing={32}>
      <Grid item xs={1}>
        <Fab aria-label="Show in Finder">
          <DesktopMac onClick={() => shell.showItemInFolder(mediaPath)} />
        </Fab>
      </Grid>

      <Grid item xs={6}>
        <TextField
          id="caption-for-facebook"
          name="captionForFacebook"
          label="Caption for FB"
          placeholder="No captio..."
          multiline
          margin="normal"
          fullWidth
          value={captionForFacebook}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={1}>
        <Checkbox name="isPublished" checked={isPublished} onChange={handleInputChange} />
      </Grid>
    </Grid>
  );
};

const StyledTextArea = styled;

export default Post;
