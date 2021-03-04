import React, { useContext, useState } from "react";
import ItemCount from "../ItemCount";
import Carrito from "providers/CartProvider";
import { Button } from "antd";

import "components/Web/ProductDetail/ProductDetail.scss";

function ProductDetail({ producto, setModalVisible }) {
  const [count, setCount] = useState(0);
  const [{ addToCart }] = useContext(Carrito);

  function agregarAlCarro() {
    const cartItem = { ...producto, cantidad: count };
    addToCart(cartItem);
    setCount(0);
    setModalVisible(false);
  }

  return (
    <div className="detalle-producto">
      <div className="detalle-producto__body">
        <img
          className="detalle-producto__body-img"
          src={producto.img}
          alt={producto.nombre}
        />
        <div className="detalle-producto__body-texto">
          <p>{producto.descripcion}</p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Precio por kilo: {producto.precio}</p>
        <p>Precio total: {producto.precio * count}</p>
      </div>
      <div className="detalle-producto__footer">
        <ItemCount count={count} setCount={setCount} max={producto.stock} />
        <Button type="primary" onClick={agregarAlCarro}>
          Agregar al Carrito{" "}
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;
