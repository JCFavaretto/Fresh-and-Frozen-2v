import React from "react";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "components/Admin/MenuTop/MenuTop.scss";
import { logout } from "API/auth";

function MenuTop({ menuCollapsed, setMenuCollapsed }) {
  function logoutUser() {
    logout();
    window.location.reload();
  }

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <h1 className="menu-top__left-logo">Juan Cruz Favaretto</h1>
        <Button
          type="link"
          onClick={() => {
            setMenuCollapsed(!menuCollapsed);
          }}
        >
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <LogoutOutlined />
        </Button>
      </div>
    </div>
  );
}

export default MenuTop;
