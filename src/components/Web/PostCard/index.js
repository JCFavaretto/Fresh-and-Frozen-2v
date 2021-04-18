import React from "react";
import moment from "moment";
import { List } from "antd";
import { Link } from "react-router-dom";

import "components/Web/PostCard/PostCard.scss";

function PostCard({ post }) {
  const date = moment(post.date).format("DD/MM/YYYY");

  return (
    <List.Item className="post">
      <Link to={`/blog/${post.id}`}>
        <div className="post__img">
          <img src={post.img} alt={post.title} />
        </div>
        <div className="post__data">
          <p className="post__data-title">{post.title}</p>
          <span className="post__data-date">{date} </span>
        </div>
      </Link>
    </List.Item>
  );
}

export default PostCard;
