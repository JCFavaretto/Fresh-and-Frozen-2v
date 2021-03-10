import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import Modal from "components/Modal";
import AddEditPostForm from "components/Admin/AddEditPostForm";

import "pages/Admin/Blog/Blog.scss";

function Blog() {
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

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

  return (
    <div className="blog">
      <h1 className="blog__titulo">Blogs</h1>
      <div className="blog__add-post">
        <Button type="primary" onClick={addPost}>
          <DiffOutlined style={{ fontSize: "1.3rem" }} />
        </Button>
      </div>

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
