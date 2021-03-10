import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { DiffOutlined } from "@ant-design/icons";

import Modal from "components/Modal";
import AddEditPostForm from "components/Admin/AddEditPostForm";

import { getPostsFire } from "Fire/blog";

import "pages/Admin/Blog/Blog.scss";
import ListPosts from "components/Admin/ListPosts";

function Blog() {
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    getPostsFire(setPosts);
    if (reloadPosts === true) {
      setReloadPosts(false);
    }
  }, [reloadPosts]);

  function addPost() {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo post");
    setModalContent(
      <AddEditPostForm
        setIsVisible={setIsVisibleModal}
        setReloadPost={setReloadPosts}
        post={null}
      />
    );
  }
  function editPost(post) {
    setIsVisibleModal(true);
    setModalTitle("Editando post");
    setModalContent(
      <AddEditPostForm
        setIsVisible={setIsVisibleModal}
        setReloadPost={setReloadPosts}
        post={post}
      />
    );
  }

  if (!posts) {
    return null;
  }

  return (
    <div className="blog__admin">
      <h1 className="blog__admin-titulo">Blogs</h1>
      <div className="blog__add-post">
        <Button type="primary" onClick={addPost}>
          <DiffOutlined style={{ fontSize: "1.3rem" }} />
        </Button>
      </div>
      <ListPosts
        posts={posts}
        setReloadPosts={setReloadPosts}
        editPost={editPost}
      />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default Blog;
