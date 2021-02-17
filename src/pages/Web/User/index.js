import React from "react";
import { Col, Row, Spin } from "antd";

import useAuth from "hooks/useAuth";
import UserForm from "components/Web/UserForm";

import "pages/Web/User/User.scss";

function User() {
  const { user } = useAuth();

  return (
    <Row style={{ minHeight: "82vh" }}>
      <Col xs={1} sm={2} lg={4}></Col>
      <Col xs={22} sm={20} lg={16}>
        <div className="usuario">
          <h3 className="usuario__titulo">Mis Datos</h3>
          {user ? <UserForm user={user} /> : <Spin />}
        </div>
      </Col>
      <Col xs={1} sm={2} lg={4}></Col>
    </Row>
  );
}

export default User;
