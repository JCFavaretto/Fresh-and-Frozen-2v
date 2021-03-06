import React, { useContext } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import useAuth from "hooks/useAuth";
import CartDetail from "components/Web/CartDetail";

import "components/Web/Cart/Cart.scss";
import Carrito from "providers/CartProvider";

function Cart({ setVisible }) {
  const { user, isLoading } = useAuth();
  const [{ cart, removeFromCart, totalGasto }] = useContext(Carrito);

  return (
    <>
      <CartDetail
        footer={
          <Button type="primary">
            {cart.length === 0 ? (
              <Link to="/productos" onClick={() => setVisible(false)}>
                Ir a productos
              </Link>
            ) : !isLoading && !user ? (
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
        cart={cart}
        removeFromCart={removeFromCart}
        totalGasto={totalGasto()}
      />
    </>
  );
}

export default Cart;
