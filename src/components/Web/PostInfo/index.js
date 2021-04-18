import React from "react";

import "components/Web/PostInfo/PostInfo.scss";
import moment from "moment";
import "moment/locale/es";

function PostInfo({ post }) {
  if (!post) {
    return null;
  }

  return (
    <div className="post-info">
      <img
        src={post.img}
        alt={post.title}
        width="300"
        style={{ margin: "0 auto", display: "block" }}
      />
      <div
        className="post-info__description"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
      <div className="post-info__creation-date">
        Fecha de publicación: {moment(post.date).locale("es").format("LL")}
      </div>
    </div>
  );
}

export default PostInfo;
