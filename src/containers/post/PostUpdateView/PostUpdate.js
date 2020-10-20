import React from "react";
import { useParams, Redirect } from "react-router-dom";
import "react-markdown-editor-lite/lib/index.css";

import Loader from "../../../components/UI/Loader";
import Message from "../../../components/UI/Message";
import PostUpdateForm from "../../../components/post/postUpdateForm/PostUpdateForm";

import { api } from "../../../api";
import { useFetch } from "../../../helpers";

const PostUpdate = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));
  if (data && data.is_author === false) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <PostUpdateForm
          postSlug={postSlug}
          initialTitle={data.title}
          initialContent={data.content}
          initialThumbnail={data.thumbnail}
        />
      )}
    </>
  );
};

export default PostUpdate;
