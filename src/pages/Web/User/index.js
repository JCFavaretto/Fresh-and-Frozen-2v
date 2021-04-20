import React from "react";
import { Col, Row, Spin } from "antd";
import { Helmet } from "react-helmet";

import useAuth from "hooks/useAuth";
import UserForm from "components/Web/UserForm";

import "pages/Web/User/User.scss";
import { Redirect } from "react-router";

function User() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <Helmet>
          <title>Mis Datos | Pescaderia Fresh&Frozen</title>
          <meta name="description" content="Usuarios Fresh&Frozen Pescaderia" />
        </Helmet>
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
      </>
    );
  }
}

export default User;
