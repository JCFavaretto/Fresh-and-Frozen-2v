import React, { useContext } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import useAuth from "hooks/useAuth";
import CartDetail from "components/Web/CartDetail";

import "components/Web/Cart/Cart.scss";
import Carrito from "providers/CartProvider";

function Cart({ setVisible }) {
  const { user, isLoading } = useAuth();
  const [{ cart }] = useContext(Carrito);

  return (
    <>
      <CartDetail
        footer={
          <Button type="primary">
            {!isLoading && !user ? (
              <Link to="/login" onClick={() => setVisible(false)}>
                Ingresar
              </Link>
            ) : (
              <Link
                to="/comprar"
                onClick={() => setVisible(false)}
                disabled={cart.length === 0}
              >
                Ir a Comprar
              </Link>
            )}
          </Button>
        }
      />
    </>
  );
}

export default Cart;
