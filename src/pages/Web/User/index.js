import React from "react";

import "pages/Web/User/User.scss";
import { Col, Row } from "antd";
import useAuth from "hooks/useAuth";

function User() {
  const { user, isLoading } = useAuth();

  return (
    <Row style={{ minHeight: "82vh" }}>
      <Col xs={1} sm={2} lg={4}></Col>
      <Col xs={22} sm={20} lg={16}></Col>
      <Col xs={1} sm={2} lg={4}></Col>
    </Row>
  );
}

export default User;
