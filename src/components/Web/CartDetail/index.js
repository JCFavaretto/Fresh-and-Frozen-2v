import React, { useContext } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Carrito from "providers/CartProvider";

function CartDetail({ footer }) {
  const [{ cart, removeFromCart, totalGasto }] = useContext(Carrito);
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
      key: item.id,
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
          <p>Gasto Total: ${totalGasto()}</p>
          {footer}
        </div>
      )}
    />
  );
}

export default CartDetail;
