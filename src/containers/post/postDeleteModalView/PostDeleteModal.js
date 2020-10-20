import React, { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import Message from "../../../components/UI/Message";

import { api } from "../../../api";
import { history } from "../../../helpers";
import { authAxios } from "../../../services";

const PostDeleteModal = ({ title, postSlug, thumbnail }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    authAxios
      .delete(api.posts.delete(postSlug), {})
      .then((response) => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error);
      });
  };

  const [open, toggle] = useState(false);
  return (
    <Modal
      trigger={
        <Button negative floated="right" onClick={() => toggle(true)}>
          Delete post
        </Button>
      }
      open={open}
      onClose={() => toggle(false)}
      size="small"
    >
      <Modal.Header>Delete post</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={thumbnail} />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message negative message={error} />}
          <p>Are you sure you want to delete this post?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => toggle(false)}>
          No
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Confirm delete"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default PostDeleteModal;
