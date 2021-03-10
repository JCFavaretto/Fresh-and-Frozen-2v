import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Row, Col, Spin } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import { updateUserFire } from "Fire/user";

import "components/Admin/EditUserForm/EditUserForm.scss";

function EditUserForm({ user, setEdit, setReloadUsers }) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!userData.name || !userData.lastName || !userData.email) {
      toast.error("El nombre, apellido e email son obligatorios ");
      return;
    }
    setLoading(true);
    updateUserFire(userData, user, setEdit, setReloadUsers, setLoading);
  }

  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  }, [user]);

  return (
    <div className="edit-user-form">
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

function EditForm({ userData, setUserData, updateUser, loading }) {
  const { Option } = Select;

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
        <Col span={12}>
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
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol de usuario"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="ADMIN_ROLE">Administrador</Option>
              <Option value="USER_ROLE">Cliente</Option>{" "}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Button
        type="primary"
        htmlType="submit"
        className="btn-submit"
        disabled={loading}
      >
        {loading ? <Spin /> : "Actualizar Usuario"}
      </Button>
    </Form>
  );
}

export default EditUserForm;
