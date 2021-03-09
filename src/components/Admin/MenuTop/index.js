import React from "react";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "components/Admin/MenuTop/MenuTop.scss";
import { auth } from "../../../Fire";
import { Link } from "react-router-dom";

function MenuTop({ menuCollapsed, setMenuCollapsed }) {
  function logoutUser() {
    auth.signOut();
    window.location.reload();
  }

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <h1 className="menu-top__left-logo">Fresh&Frozen</h1>
        <Button
          style={{ fontSize: "1.1rem" }}
          type="link"
          onClick={() => {
            setMenuCollapsed(!menuCollapsed);
          }}
        >
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link">
          <Link to="/">
            <HomeOutlined />
            <span className="menu-top__right-hide">Sitio Web</span>
          </Link>
        </Button>
        <Button type="link" onClick={logoutUser}>
          <LogoutOutlined />
          <span className="menu-top__right-hide">Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}

export default MenuTop;
