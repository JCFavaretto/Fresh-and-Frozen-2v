import React, { useEffect } from "react";
import { Button, Modal } from "antd";

import {
  onTheWayOrder,
  deliveredOrder,
  cancelOrder,
  deleteOrder,
  updateMPStatus,
} from "Fire/orders";

import "components/Admin/OrderItem/OrderItem.scss";

export default function OrderItem({ order, setReloadOrders }) {
  const { confirm } = Modal;

  function showDeleteConfimation() {
    confirm({
      title: "Eliminando orden de compra",
      content: `¿Seguro de eliminar la orden de compra?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => deleteOrder(order, setReloadOrders),
    });
  }

  useEffect(() => {
    if (!order.cancelada && order.mercadoPago) {
      if (order.paymentStatus !== "Acreditado") {
        updateMPStatus(order, order.paymentId, setReloadOrders);
      }
    }
  }, [order]);

  return (
    <div className="order-item">
      <div className="order-item__datos">
        <div className="order-item__datos-comprador">
          <div>
            Dia del pedido:
            <span>
              {" "}
              {order.date.toDate().getDate() +
                "/" +
                (order.date.toDate().getMonth() + 1) +
                "/" +
                order.date.toDate().getFullYear() +
                " - " +
                order.date.toDate().getHours() +
                ":" +
                order.date.toDate().getMinutes()}
            </span>
          </div>
          <div>
            Comprador: <span>{order.nombre}</span>
          </div>
          <div>
            Direccion: <span>{order.calle + " " + order.altura}</span>{" "}
          </div>
          <div className="order-item__datos__piso">
            {" "}
            {order.piso && (
              <div>
                Piso:<span> {order.piso}</span>
              </div>
            )}
            {order.depto && (
              <div>
                Departamento:<span> {order.depto}</span>
              </div>
            )}
          </div>
          <div>
            Telefono: <span>{order.telefono}</span>{" "}
          </div>
        </div>
        <div className="order-item__datos-pedido">
          <div>
            Pedido:
            <ul
              style={{ listStyle: "square" }}
              className="order-item__datos-pedido-lista"
            >
              {order.cart.map((item) => {
                return (
                  <li key={item.id}>
                    <div>
                      <span> {item.nombre}</span> |
                      <span> {item.cantidad} .kg </span>| $
                      <span>{item.precio * item.cantidad}</span>{" "}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>
              Precio total:<span> {order.total}</span>
            </div>
            <div>
              Metodo de Pago:{" "}
              <span>{order.mercadoPago ? "MercadoPago" : "Efectivo"}</span>{" "}
            </div>
            {order.mercadoPago && (
              <div>
                Estado del Pago: <span>{order.paymentStatus}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="order-item__botonera">
        {order.cancelada ? (
          <Button block type="danger" onClick={() => showDeleteConfimation()}>
            Eliminar
          </Button>
        ) : order.onTheWay ? (
          <>
            {" "}
            <Button
              block
              type="danger"
              onClick={() => cancelOrder(order, setReloadOrders)}
            >
              Cancelado
            </Button>
            <Button
              block
              type="primary"
              onClick={() => deliveredOrder(order, setReloadOrders)}
            >
              Entregado
            </Button>
          </>
        ) : order.entregado ? (
          <Button block type="danger" onClick={() => showDeleteConfimation()}>
            Eliminar
          </Button>
        ) : (
          <>
            {" "}
            <Button
              block
              type="danger"
              onClick={() => cancelOrder(order, setReloadOrders)}
            >
              Cancelado
            </Button>
            <Button
              block
              type="primary"
              onClick={() => onTheWayOrder(order, setReloadOrders)}
            >
              En camino
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
