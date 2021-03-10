import React from "react";
import { List, Button, Modal } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { deletePostFire } from "Fire/blog";

import "components/Admin/ListPosts/ListPosts.scss";

const { confirm } = Modal;

function ListPosts({ posts, setReloadPosts, editPost }) {
  return (
    <div className="posts-list">
      <List
        dataSource={posts}
        renderItem={(post) => (
          <Post
            post={post}
            setReloadPosts={setReloadPosts}
            editPost={editPost}
          />
        )}
      />
    </div>
  );
}

export default ListPosts;

function Post({ post, setReloadPosts, editPost }) {
  function removePost(post) {
    deletePostFire(post.id, setReloadPosts);
  }

  function showDeleteConfimation() {
    confirm({
      title: "Eliminando post",
      content: `¿Seguro de eliminar el post "${post.title}"?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => removePost(post),
    });
  }

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.id}`} target="_blank">
          <Button type="primary" target="_blank">
            <EyeOutlined />
          </Button>
        </Link>,
        <Button
          type="primary"
          onClick={() => {
            editPost(post);
          }}
        >
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfimation}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      {post.title}
    </List.Item>
  );
}
