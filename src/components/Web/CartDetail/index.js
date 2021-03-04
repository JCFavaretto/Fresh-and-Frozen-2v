import React from "react";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function CartDetail({ footer, cart, removeFromCart, totalGasto }) {
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

  const columns2 = [
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

  let data2 = cart.map((item) => {
    return {
      nombre: item.nombre,
      precio: `$${item.precio}`,
      cantidad: `${item.cantidad} kg.`,
      key: item.id,
    };
  });

  return (
    <Table
      className="cart"
      columns={removeFromCart ? columns : columns2}
      dataSource={removeFromCart ? data : data2}
      size="small"
      pagination={false}
      footer={() => (
        <div className="cart__footer">
          <p>Gasto Total: ${totalGasto}</p>
          {footer}
        </div>
      )}
    />
  );
}

export default CartDetail;
