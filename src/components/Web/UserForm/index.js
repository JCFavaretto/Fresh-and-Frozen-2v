import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Input, Row, Form, Avatar } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { getAvatarApi, uploadAvatarApi, updateUserApi } from "API/user";
import { getAccessToken, getRefreshToken, refreshAccessToken } from "API/auth";
import noAvatar from "assets/img/no-avatar.png";

import "components/Web/UserForm/UserForm.scss";

function UserForm({ user }) {
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    let updateUser = userData;
    const token = getAccessToken();
    if (updateUser.password || updateUser.repeatPassword) {
      if (updateUser.password !== updateUser.repeatPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      } else {
        delete updateUser.repeatPassword;
      }
    }
    if (!updateUser.name || !updateUser.lastName || !updateUser.email) {
      toast.error("El nombre, apellido e email son obligatorios ");
      return;
    }
    if (typeof updateUser.avatar === "object") {
      uploadAvatarApi(token, updateUser.avatar, user.id).then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          updateUser.avatar = res.img;
          updateUserApi(token, updateUser, user.id).then((res) => {
            if (!res.ok) {
              toast.error(res.message);
            } else {
              toast.success("Usuario Actualizado Correctamente");
              refreshAccessToken(getRefreshToken());
            }
          });
        }
      });
    } else {
      updateUserApi(token, updateUser, user.id).then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success("Usuario Actualizado Correctamente");
          refreshAccessToken(getRefreshToken());
        }
      });
    }
  }

  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
    });
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
  }, [avatar]); //eslint-disable-line

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <DaForm
        userData={userData}
        setUserData={setUserData}
        updateUser={handleSubmit}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;

  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else setAvatarUrl(avatar);
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={noAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
      )}
    </div>
  );
}

function DaForm({ userData, setUserData, updateUser }) {
  return (
    <Form className="form-edit" onSubmitCapture={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              placeholder="Apellido"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Input
              type="email"
              prefix={<MailOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              placeholder="Correo Electronico"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  repeatPassword: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" className="btn-submit">
        Actualizar datos
      </Button>
    </Form>
  );
}

export default UserForm;
