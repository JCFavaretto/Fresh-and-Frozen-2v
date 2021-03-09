import React from "react";
import { List } from "antd";

import OrderItem from "components/Admin/OrderItem";

import "components/Admin/ListOrders/ListOrders.scss";

function ListOrders({ orders, setReloadOrders }) {
  return (
    <List
      className="products-active"
      itemLayout="horizontal"
      dataSource={orders}
      renderItem={(order) => (
        <OrderItem order={order} setReloadOrders={setReloadOrders} />
      )}
    />
  );
}

export default ListOrders;
