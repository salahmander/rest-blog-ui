import React from "react";
import { NavLink } from "react-router-dom";
import { Item } from "semantic-ui-react";

const PostCard = (props) => {
  const { post } = props;
  return (
    <>
      <Item key={post.id}>
        <Item.Image size="small" src={post.thumbnail} />
        <Item.Content>
          <NavLink to={`/posts/${post.slug}`}>
            <Item.Header as="h3">{post.title}</Item.Header>
          </NavLink>
          <Item.Description>{post.content}</Item.Description>
        </Item.Content>
      </Item>
    </>
  );
};

export default PostCard;
