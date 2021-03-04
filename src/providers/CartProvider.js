import React, { useEffect, useState } from "react";

import { useLocalCart } from "hooks/useLocalCart";
import { toast } from "react-toastify";

const Carrito = React.createContext({});

export const CartProvider = ({ children }) => {
  const [storedValue, setValue, emptyStorage] = useLocalCart();
  const [cart, setCart] = useState(storedValue);

  useEffect(() => {
    setValue(cart);
  }, [cart]); //eslint-disable-line

  function addToCart(cartItem) {
    let existe = false;
    if (cart.length > 0) {
      setCart(() => {
        const newCart = cart.map((item) => {
          if (item.id === cartItem.id) {
            item.cantidad = item.cantidad + cartItem.cantidad;
            if (item.cantidad > item.stock) {
              toast.info("Tiene el stock total en el carrito.");
              item.cantidad = item.stock;
            }
            existe = true;
          }
          return item;
        });

        const filterCart = newCart.filter((item) => item.cantidad > 0);
        return filterCart;
      });
    }
    if (!existe) {
      setCart(() => [...cart, cartItem]);
    }
    toast.success("Producto agregado al carrito.");
  }

  const totalGasto = () => {
    let count = 0;
    if (Array.isArray(cart)) {
      cart.forEach((item) => {
        count = count + item.cantidad * item.precio;
        return count;
      });
    }
    return count;
  };

  // Retorna la cantidad de items agregados al carrito de un elemento particular
  const returnCount = ({ id }) => {
    let count = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        if (item.id === id) {
          count = item.cantidad;
        }

        return count;
      });
    }
    return count;
  };

  function removeFromCart(id) {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    toast.error("Producto eliminado.");
  }

  return (
    <Carrito.Provider
      value={[
        {
          cart,
          setCart,
          addToCart,
          emptyStorage,
          totalGasto,
          returnCount,
          removeFromCart,
        },
      ]}
    >
      {children}
    </Carrito.Provider>
  );
};

export default Carrito;
