import React, { useEffect } from "react";
import { Button, Modal } from "antd";

import CartDetail from "components/Web/CartDetail";

import { cancelOrder, updateMPStatus } from "Fire/orders";

import "components/Web/OrderDetail/OrderDetail.scss";

function OrderDetail({ order, setReloadOrders }) {
  const { confirm } = Modal;

  function expectedDelivery() {
    if (order.onTheWay) {
      return `En camino.`;
    } else {
      let actualDay = new Date().getDay();
      let actualTime = new Date().getHours();
      let date = new Date().getDate();
      let day = 1;
      if (order.deliveryDay === "martes") {
        day = 2;
      } else if (order.deliveryDay === "miercoles") {
        day = 3;
      } else if (order.deliveryDay === "jueves") {
        day = 4;
      } else if (order.deliveryDay === "viernes") {
        day = 5;
      }

      if (actualDay === day) {
        if (actualTime >= 12) {
          date = date + 7;
        }
      } else if (actualDay > day) {
        date = date + (7 + day - actualDay);
      } else {
        date = date + (day - actualDay);
      }

      //checks if the date is bigger than the number of days in the month
      let orderMonth = order.date.toDate().getMonth();
      let months31 = [0, 2, 4, 6, 7, 9, 11];
      let months30 = [3, 5, 8, 10];

      if (orderMonth === 1) {
        if (new Date().getFullYear() % 4 === 0) {
          if (date > 29) {
            date = date - 29;
          }
        } else {
          if (date > 28) {
            date = date - 28;
          }
        }
      } else if (months31.includes(orderMonth)) {
        if (date > 31) {
          date = date - 31;
        }
      } else if (months30.includes(orderMonth)) {
        if (date > 30) {
          date = date - 30;
        }
      }

      // the returns the expected delivery day directly to print
      if (date < order.date.toDate().getDate()) {
        return `${date}/${
          order.date.toDate().getMonth() + 2
        }/${order.date.toDate().getFullYear()}`;
      } else {
        return `${date}/${
          order.date.toDate().getMonth() + 1
        }/${order.date.toDate().getFullYear()}`;
      }
    }
  }

  function showCancelConfimation() {
    confirm({
      title: "Cancelar compra",
      content: `¿Seguro de cancelar la orden de compra?`,
      okText: "Cancelar ",
      okType: "danger",
      cancelText: "Volver",
      onOk: () => cancelOrder(order, setReloadOrders),
    });
  }

  useEffect(() => {
    if (!order.cancelada && order.mercadoPago) {
      if (order.paymentStatus !== "Acreditado") {
        updateMPStatus(order, order.paymentId, setReloadOrders);
      }
    }
  }, [order]); //eslint-disable-line

  return (
    <div className="order-detail">
      <h4 className="order-detail__subtitulo">Detalles de la compra</h4>
      <CartDetail cart={order.cart} totalGasto={order.total} />{" "}
      <p className="order-detail__subtitulo">Datos del pedido</p>
      <ul className="order-detail__datos">
        {!order.cancelada && (
          <>
            <li className="order-detail__dato">
              <p>Dia de entrega elegido: </p>{" "}
              <span>
                {order.deliveryDay.charAt(0).toUpperCase() +
                  order.deliveryDay.slice(1)}
              </span>
            </li>
            <li className="order-detail__dato">
              <p>Fecha estimada: </p> <span>{expectedDelivery()}</span>
            </li>
            <li className="order-detail__dato">
              <p>Método de Pago: </p>
              <span>{order.mercadoPago ? "MercadoPago" : "Efectivo"}</span>
            </li>
            {order.mercadoPago && (
              <li className="order-detail__dato">
                <p>Estado del Pago: </p>
                <span>{order.paymentStatus}</span>
              </li>
            )}
          </>
        )}
        <li className="order-detail__dato">
          <p>Dirección: </p> <span>{order.calle + " " + order.altura}</span>
        </li>
        {order.piso !== "" && (
          <li className="order-detail__dato">
            <p>Piso: </p>
            <span>{order.piso}</span>{" "}
          </li>
        )}
        {order.depto !== "" && (
          <li className="order-detail__dato">
            <p>Departamento: </p>
            <span>{order.depto}</span>{" "}
          </li>
        )}
        <li className="order-detail__dato">
          <p> Numero de contacto: </p>
          <span>{order.telefono}</span>
        </li>
        <li className="order-detail__dato">
          <p>Estado: </p>
          <span>
            {order.cancelada
              ? "Cancelado"
              : order.onTheWay
              ? "En Camino"
              : order.entregado
              ? "Entregado"
              : "Pendiente"}
          </span>
        </li>

        {!order.cancelada && !order.onTheWay && !order.entregado && (
          <li style={{ listStyle: "none", marginTop: "1rem" }}>
            <Button type="danger" block onClick={showCancelConfimation}>
              Cancelar Compra
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default OrderDetail;
