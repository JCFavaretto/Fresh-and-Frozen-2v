import React, { useState } from "react";
import { Layout } from "antd";
import { Redirect, Route } from "react-router-dom";

import LoadRouters from "components/LoadRouters";
import MenuTop from "components/Admin/MenuTop";
import MenuSider from "components/Admin/MenuSider";
import "layouts/LayoutAdmin.scss";
import AdminSignIn from "pages/Admin/SignIn";

import useAuth from "hooks/useAuth";

function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { Header, Content, Footer } = Layout;

  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    if (user.role === "ADMIN_ROLE") {
      return (
        <Layout>
          <MenuSider menuCollapsed={menuCollapsed} />
          <Layout
            className="layout-admin"
            style={{ marginLeft: menuCollapsed ? "50px" : "200px" }}
          >
            <Header className="layout-admin__header">
              <MenuTop
                menuCollapsed={menuCollapsed}
                setMenuCollapsed={setMenuCollapsed}
              />
            </Header>
            <Content className="layout-admin__content">
              <LoadRouters routes={routes} />
            </Content>
            <Footer className="layout-admin__footer">
              Juan Cruz Favaretto
            </Footer>
          </Layout>
        </Layout>
      );
    } else {
      return (
        <>
          {" "}
          <Redirect to="/" />
        </>
      );
    }
  } else {
    return null;
  }
}

export default LayoutAdmin;
