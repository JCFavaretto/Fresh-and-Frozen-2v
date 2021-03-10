import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Form, Spin } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import { updateUserFire } from "Fire/user";

import "components/Web/UserForm/UserForm.scss";

function UserForm({ user }) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    let updateUser = userData;
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
    setLoading(true);
    updateUserFire(updateUser, user, null, null, setLoading);
  }

  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    });
  }, [user]);

  return (
    <div className="edit-user-form">
      <DaForm
        userData={userData}
        setUserData={setUserData}
        updateUser={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

function DaForm({ userData, setUserData, updateUser, loading }) {
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

      <Button
        type="primary"
        htmlType="submit"
        className="btn-submit"
        disabled={loading}
      >
        {loading ? <Spin /> : "Actualizar datos"}
      </Button>
    </Form>
  );
}

export default UserForm;
