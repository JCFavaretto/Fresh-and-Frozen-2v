import React from "react";
import { Row, Col, Select } from "antd";

import "components/Web/SelectOrders/SelectOrders.scss";

function SelectOrders({ orders, order, setOrder }) {
  const { Option } = Select;

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Select
          placeholder="Fecha de compra"
          onChange={(e) => setOrder(e)}
          value={order}
          className="select-order"
        >
          {orders.map((item, i) => {
            return (
              <Option key={item.id} value={i}>
                {item.date.toDate().getDate() +
                  "/" +
                  (item.date.toDate().getMonth() + 1) +
                  "/" +
                  item.date.toDate().getFullYear() +
                  " - " +
                  item.date.toDate().getHours() +
                  ":" +
                  item.date.toDate().getMinutes()}{" "}
              </Option>
            );
          })}
        </Select>
      </Col>
    </Row>
  );
}

export default SelectOrders;
