import React from "react";
import { Redirect } from "react-router-dom";
import { Tabs, Col, Row } from "antd";

import RegisterForm from "components/RegisterForm";
import LoginForm from "components/LoginForm";

import useAuth from "hooks/useAuth";

import "pages/Web/Login/Login.scss";

function Login() {
  const { TabPane } = Tabs;
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Row style={{ minHeight: "82vh" }}>
      <Col xs={1} sm={2} lg={4}></Col>
      <Col xs={22} sm={20} lg={16}>
        <Tabs type="card" className="login-tabs">
          <TabPane tab={<span>Entrar</span>} key="1">
            <LoginForm />
          </TabPane>
          <TabPane tab={<span>Registrarse</span>} key="2">
            <RegisterForm />
          </TabPane>
        </Tabs>
      </Col>
      <Col xs={1} sm={2} lg={4}></Col>
    </Row>
  );
}

export default Login;
