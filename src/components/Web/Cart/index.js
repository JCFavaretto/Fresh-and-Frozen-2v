import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import useAuth from "hooks/useAuth";
import CartDetail from "components/Web/CartDetail";

import "components/Web/Cart/Cart.scss";

function Cart({ setVisible }) {
  const { user, isLoading } = useAuth();

  return (
    <CartDetail
      footer={
        <Button type="primary">
          {!isLoading && !user ? (
            <Link to="/login" onClick={() => setVisible(false)}>
              Ingresar
            </Link>
          ) : (
            <Link to="/comprar" onClick={() => setVisible(false)}>
              Ir a Comprar
            </Link>
          )}
        </Button>
      }
    />
  );
}

export default Cart;
