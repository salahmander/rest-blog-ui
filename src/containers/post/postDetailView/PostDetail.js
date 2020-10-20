import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button, Container, Divider, Header, Image } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

import Loader from "../../../components/UI/Loader";
import Message from "../../../components/UI/Message";
import PostDeleteModal from "../postDeleteModalView/PostDeleteModal";

import { api } from "../../../api";
import { useFetch } from "../../../helpers";

const PostDetail = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));
  return (
    <Container text style={{ paddingTop: 10, paddingBottom: 10 }}>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <div>
          <Image src={data.thumbnail} />
          <Header as="h1">{data.title}</Header>
          <Header as="h4">
            Last updated:{" "}
            {`${new Date(data.last_updated).toLocaleDateString()}`}
          </Header>
          <ReactMarkdown source={data.content} />
          <Divider />
          {data.is_author && (
            <>
              <NavLink to={`/posts/${postSlug}/update/`}>
                <Button color="blue">Update</Button>
              </NavLink>
              <PostDeleteModal
                postSlug={postSlug}
                title={data.title}
                thumbnail={data.thumbnail}
              />
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default PostDetail;
