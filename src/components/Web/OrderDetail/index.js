import React from "react";

import CartDetail from "components/Web/CartDetail";

import "components/Web/OrderDetail/OrderDetail.scss";

function OrderDetail({ order }) {
  return (
    <div className="order-detail">
      <h4 className="order-detail__subtitulo">Detalles de la compra</h4>
      <CartDetail cart={order.cart} totalGasto={order.total} />{" "}
      <p className="order-detail__subtitulo">Datos del pedido</p>
      <ul className="order-detail__datos">
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
          <span>{order.entregado ? "Entregado" : "Pendiente"}</span>
        </li>
      </ul>
    </div>
  );
}

export default OrderDetail;
