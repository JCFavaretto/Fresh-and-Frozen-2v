import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";

import logo from "assets/img/logo.jfif";

import CartIcon from "components/Web/CartIcon";
import "components/Web/MenuTop/MenuTop.scss";
import useAuth from "hooks/useAuth";

import { MenuOutlined } from "@ant-design/icons";
import { auth } from "Fire";

function MenuTop() {
  const { user, isLoading } = useAuth();
  const [subMenu, setSubMenu] = useState(false);

  const [isUser, setIsUser] = useState(false);

  function logoutUser() {
    auth.signOut().then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    setIsUser(!isLoading && user ? true : false);
  }, [user, isLoading]); //eslint-disable-line

  return (
    <div className="menu-completo ">
      <Menu className="menu-top-web" mode="horizontal">
        <Menu.Item className="menu-top-web__logo">
          <Link to="/">
            {/* <img src={logo} alt="Fresh&Frozen" width="180px" /> */}
            <div className="menu-top-web__logo-d">
              <h3>
                FRESH<span>&</span>FROZEN
              </h3>
              <p>PESCADERIA</p>
            </div>
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

          <Menu.Item key="2">
            <Link to="/productos/promociones">Promociones</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/productos/frescos">Frescos</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/productos/congelados">Congelados</Link>
          </Menu.Item>

          <Menu.Item key="">
            <Link to="/productos/rebozados">Rebozados</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item className="menu-top-web__item">
          <Link to="/blog">Blog</Link>
        </Menu.Item>
        {isUser ? (
          <Menu.SubMenu className="menu-top-web__item" title={user.name}>
            <Menu.Item>
              <Link to="/usuario">Mis Datos</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/mis-compras">Mis Compras</Link>
            </Menu.Item>
            {user.role === "ADMIN_ROLE" && (
              <Menu.Item>
                <Link to="/admin">Seccion Admin</Link>
              </Menu.Item>
            )}
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
          <CartIcon />
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

          <Menu.Item key="2">
            <Link to="/productos/promociones">Promociones</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/productos/frescos">Frescos</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/productos/congelados">Congelados</Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to="/productos/rebozados">Rebozados</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item className="menu-expandible__item">
          <Link to="/blog">Blog</Link>
        </Menu.Item>
        {isUser ? (
          <Menu.SubMenu className="menu-expandible__item" title={user.name}>
            <Menu.Item>
              <Link to="/usuario">Mis Datos</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/mis-compras">Mis Compras</Link>
            </Menu.Item>
            {user.role === "ADMIN_ROLE" && (
              <Menu.Item>
                <Link to="/admin">Seccion Admin</Link>
              </Menu.Item>
            )}
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
