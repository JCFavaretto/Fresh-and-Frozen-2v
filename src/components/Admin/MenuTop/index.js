import React from "react";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "components/Admin/MenuTop/MenuTop.scss";
import { auth } from "../../../Fire";

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
        <Button style={{ fontSize: "1.1rem" }} type="link" onClick={logoutUser}>
          <LogoutOutlined />
        </Button>
      </div>
    </div>
  );
}

export default MenuTop;
