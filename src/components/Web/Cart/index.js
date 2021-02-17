import React, { useContext } from "react";

import Carrito from "providers/CartProvider";

import "components/Web/Cart/Cart.scss";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useAuth from "hooks/useAuth";

function Cart({ setVisible }) {
  const [{ cart, removeFromCart, totalGasto }] = useContext(Carrito);
  const { user, isLoading } = useAuth();

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (fila) => (
        <Button type="danger" onClick={fila}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  let data = cart.map((item) => {
    return {
      nombre: item.nombre,
      precio: `$${item.precio}`,
      cantidad: `${item.cantidad} kg.`,
      key: item._id,
      action: () => removeFromCart(item._id),
    };
  });

  return (
    <Table
      className="cart"
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      footer={() => (
        <div className="cart__footer">
          <p>Gasto Total: ${totalGasto()}</p>{" "}
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
        </div>
      )}
    />
  );
}

export default Cart;
