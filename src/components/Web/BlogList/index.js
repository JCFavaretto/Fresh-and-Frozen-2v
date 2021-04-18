import React from "react";
import { List } from "antd";

import PostCard from "components/Web/PostCard";

import "components/Web/BlogList/BlogList.scss";

function BlogList({ posts }) {
  if (!posts) {
    return null;
  }

  return (
    <div className="posts-list-web">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
        }}
        dataSource={posts}
        renderItem={(post) => <PostCard post={post} />}
      />
    </div>
  );
}

export default BlogList;
