import React, { useRef, useState } from "react";
import { Header, Button, Form } from "semantic-ui-react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import { history } from "../../../helpers";
import { api } from "../../../api";
import { authAxios } from "../../../services";

import Message from "../../../components/UI/Message";

const PostCreate = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const fileInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("content", markdown);
    authAxios
      .post(api.posts.create, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        history.push("/posts");
        // redirect back to the post list
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error.message || error);
      });
  };

  return (
    <div>
      <Header>Create a post</Header>
      {error && <Message danger message={error} />}
      {thumbnail && (
        <Message info message={`Selected image: ${thumbnail.name}`} />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title of your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <MdEditor
          value=""
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

export default PostCreate;
