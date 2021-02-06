import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";

import "pages/Admin/SignIn/SignIn.scss";
import RegisterForm from "components/RegisterForm";

function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">Fresh&Frozen</h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              Component LoginForm
            </TabPane>
            <TabPane tab={<span>Registrarse</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}

export default SignIn;
