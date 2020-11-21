import React, { useState } from "react";
import { Layout } from "antd";
import LoadRouters from "components/LoadRouters";
import MenuTop from "components/Admin/MenuTop";
import MenuSider from "components/Admin/MenuSider";
import "layouts/LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
      >
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </Header>
        <Content className="layout-admin__content">
          <h2>Menu Sider Admin</h2>
          <LoadRouters routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">Juan Cruz Favaretto</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutAdmin;
