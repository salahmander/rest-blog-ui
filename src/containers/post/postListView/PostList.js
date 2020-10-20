import React from "react";
import { Divider, Header, Item } from "semantic-ui-react";

import Loader from "../../../components/UI/Loader";
import Message from "../../../components/UI/Message";
import PostCard from "../../../components/post/postCard/PostCard";

import { api } from "../../../api";
import { useFetch } from "../../../helpers";

const PostList = () => {
  const { data, loading, error } = useFetch(api.posts.list);
  return (
    <div>
      <Header>Post list</Header>
      <Divider />
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      <Item.Group>
        {data?.map((post) => {
          return <PostCard post={post} />;
        })}
      </Item.Group>
    </div>
  );
};

export default PostList;
