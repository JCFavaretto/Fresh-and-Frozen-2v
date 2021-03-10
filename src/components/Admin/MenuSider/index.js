import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import "components/Admin/MenuSider/MenuSider.scss";

function MenuSider({ menuCollapsed, location }) {
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin/users">
          <Link to={"/admin/users"}>
            <UserOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/productos">
          <Link to={"/admin/productos"}>
            <ShoppingCartOutlined />
            <span className="nav-text">Productos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/orders">
          <Link to={"/admin/orders"}>
            <DollarCircleOutlined />
            <span className="nav-text">Ordenes de Compra</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/blog">
          <Link to={"/admin/blog"}>
            <SnippetsOutlined />
            <span className="nav-text">Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
