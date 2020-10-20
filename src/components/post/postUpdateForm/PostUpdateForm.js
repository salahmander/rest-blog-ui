import React, { useState, useRef } from "react";
import { Button, Form, Header, Image, Divider } from "semantic-ui-react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import Message from "../../UI/Message";

import { api } from "../../../api";
import { authAxios } from "../../../services";
import { history } from "../../../helpers";

const PostUpdateForm = ({
  postSlug,
  initialTitle,
  initialContent,
  initialThumbnail,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [markdown, setMarkdown] = useState(initialContent);
  const [currentThumbnail] = useState(initialThumbnail);
  const [thumbnail, setThumbnail] = useState(null);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const fileInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("title", title);
    formData.append("content", markdown);
    authAxios
      .put(api.posts.update(postSlug), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error);
      });
  };

  return (
    <div>
      <Header>Update post</Header>
      {error && <Message negative message={error} />}
      {currentThumbnail && <Image src={currentThumbnail} size="small" />}
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title of your post"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Field>
        <MdEditor
          value={markdown}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setMarkdown(text)}
        />
        <Form.Field>
          <Button
            type="button"
            fluid
            content="Choose a thumbnail"
            labelPosition="left"
            icon="file"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={(event) => setThumbnail(event.target.files[0])}
          />
        </Form.Field>
        <Button
          primary
          fluid
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PostUpdateForm;
