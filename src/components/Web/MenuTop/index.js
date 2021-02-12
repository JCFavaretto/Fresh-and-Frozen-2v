import React, { useState } from "react";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";

import logo from "assets/img/logo.jfif";

import "components/Web/MenuTop/MenuTop.scss";
import useAuth from "hooks/useAuth";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { logout } from "API/auth";

function MenuTop() {
  const { user, isLoading } = useAuth();
  const [subMenu, setSubMenu] = useState(false);
  function logoutUser() {
    logout();
    window.location.reload();
  }

  return (
    <div className="menu-completo">
      <Menu className="menu-top-web" mode="horizontal">
        <Menu.Item className="menu-top-web__logo">
          <Link to="/">
            <img src={logo} alt="Fresh&Frozen" width="180px" />
          </Link>
        </Menu.Item>
        <Menu.Item className="menu-top-web__item">
          <Link to="/nosotros">Nosotros</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="sub1"
          title="Productos"
          className="menu-top-web__item"
        >
          <Menu.Item key="1">
            <Link to="/productos">Todos los productos</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/promociones">Promociones</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/frescos">Frescos</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/congelados">Congelados</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/rebozados">Rebozados</Link>
          </Menu.Item>
        </Menu.SubMenu>
        {!isLoading && user ? (
          <Menu.SubMenu className="menu-top-web__item" title={user.name}>
            <Menu.Item>
              <Link to="/usuario">Mis Datos</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/compras">Mis Compras</Link>
            </Menu.Item>
            <Menu.Item>
              <p
                onClick={logoutUser}
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                Salir
              </p>
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.Item className="menu-top-web__item">
            <Link to="/login">Ingresar</Link>
          </Menu.Item>
        )}
        <Menu.Item className="menu-top-web__iconos">
          <Button className="menu-top-web__iconos-btn-cart">
            <ShoppingCartOutlined />
          </Button>
          <Button
            className="menu-top-web__iconos-btn-menu"
            onClick={() => {
              setSubMenu(!subMenu);
            }}
          >
            <MenuOutlined />
          </Button>
        </Menu.Item>
      </Menu>
      {/*--------------------Menu expandible-----------------------------------------------------------------------------------------------------------------------------------*/}
      <Menu
        className={subMenu ? "menu-expandible" : "menu-expandible-none"}
        mode="inline"
        onClick={() => {
          setSubMenu(!subMenu);
        }}
      >
        {" "}
        <Menu.Item className="menu-expandible__item">
          <Link to="/nosotros">Nosotros</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="sub1"
          title="Productos"
          className="menu-expandible__item"
        >
          <Menu.Item key="1">
            <Link to="/productos">Todos los productos</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/promociones">Promociones</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/frescos">Frescos</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/congelados">Congelados</Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/rebozados">Rebozados</Link>
          </Menu.Item>
        </Menu.SubMenu>
        {!isLoading && user ? (
          <Menu.SubMenu className="menu-expandible__item" title={user.name}>
            <Menu.Item>
              <Link to="/usuario">Mis Datos</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/compras">Mis Compras</Link>
            </Menu.Item>
            <Menu.Item>
              <p
                onClick={logoutUser}
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                Salir
              </p>
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.Item className="menu-expandible__item">
            <Link to="/login">Ingresar</Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}

export default MenuTop;
