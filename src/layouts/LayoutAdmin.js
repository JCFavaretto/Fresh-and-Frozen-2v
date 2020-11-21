import React from "react";
import { Layout } from "antd";
import LoadRouters from "components/LoadRouters";

import "layouts/LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header style={{ color: "white" }}>Seccion Administradores</Header>
      <Layout>
        <Content>
          <h2>Menu Sider Admin</h2>
          <LoadRouters routes={routes} />
        </Content>
        <Footer>Juan Cruz Favaretto</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutAdmin;
