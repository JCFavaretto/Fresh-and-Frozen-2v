import React from "react";
import { Redirect } from "react-router-dom";
import { Tabs } from "antd";

import { getAccessToken } from "API/auth";

import RegisterForm from "components/RegisterForm";
import LoginForm from "components/LoginForm";

import "pages/Web/Login/Login.scss";

function Login() {
  const { TabPane } = Tabs;

  if (getAccessToken()) {
    return <Redirect to="/" />;
  }

  return (
    <Tabs type="card" className="login-tabs">
      <TabPane tab={<span>Entrar</span>} key="1">
        <LoginForm />
      </TabPane>
      <TabPane tab={<span>Registrarse</span>} key="2">
        <RegisterForm />
      </TabPane>
    </Tabs>
  );
}

export default Login;
