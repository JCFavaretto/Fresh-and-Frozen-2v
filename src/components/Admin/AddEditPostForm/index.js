import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import { FontSizeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { addNewPostFire, updatePostFire } from "Fire/blog";

import "components/Admin/AddEditPostForm/AddEditPostForm.scss";

function AddEditPostForm({ setIsVisible, setReloadPost, post }) {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  function onSubmit(e) {
    e.preventDefault();
    if (!postData.title) {
      toast.warn("El titulo es obligatorio.");
    } else if (!postData.date) {
      toast.warn("La fecha es obligatoria");
    } else if (!postData.description) {
      toast.warn("El posteo esta vacio.");
    } else {
      setLoading(true);
      if (post) {
        updatePostFire(postData, setReloadPost, setIsVisible, setLoading);
      } else {
        addNewPostFire(
          postData,
          setReloadPost,
          setIsVisible,
          setLoading,
          setPostData
        );
      }
    }
  }
  const handleEditorChange = (content, editor) => {
    setPostData({ ...postData, description: content });
  };

  return (
    <div className="add-edit-post">
      <Form
        className="add-edit-post-form"
        layout="inline"
        onSubmitCapture={onSubmit}
      >
        <div className="add-edit-post-form-inputs">
          <div className="add-edit-post-form-inputs-data">
            <Input
              prefix={<FontSizeOutlined />}
              placeholder="Titulo"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </div>

          <div className="add-edit-post-form-inputs-data">
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder="Fecha de publicación"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
              value={postData.date && moment(postData.date)}
              onChange={(e, value) => {
                setPostData({
                  ...postData,
                  date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
                });
              }}
            />
          </div>
        </div>
        <Editor
          value={post ? postData.description : ""}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic fontsizeselect forecolor backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={handleEditorChange}
        />
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          disabled={loading}
          block
        >
          {loading ? <Spin /> : post ? "Actualizar Post " : "Crear Post"}
        </Button>
      </Form>
    </div>
  );
}

export default AddEditPostForm;
