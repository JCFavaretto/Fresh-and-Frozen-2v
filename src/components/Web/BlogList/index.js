import React from "react";
import { List } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import "components/Web/BlogList/BlogList.scss";

function BlogList({ posts }) {
  if (!posts) {
    return null;
  }

  return (
    <div className="posts-list-web">
      <List dataSource={posts} renderItem={(post) => <Post post={post} />} />
    </div>
  );
}

export default BlogList;

function Post({ post }) {
  const date = moment(post.date).format("DD/MM/YYYY");

  return (
    <List.Item className="post">
      {" "}
      <span className="post_date">{date} </span>
      <Link to={`/blog/${post.id}`}>{post.title}</Link>
    </List.Item>
  );
}
