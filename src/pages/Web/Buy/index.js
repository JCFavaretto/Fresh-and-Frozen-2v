import React from "react";
import { Col, Row } from "antd";

import CartDetail from "components/Web/CartDetail";

import "pages/Web/Buy/Buy.scss";
import BuyAddressForm from "components/Web/BuyAddressForm";

function Buy() {
  return (
    <Row style={{ minHeight: "82vh" }}>
      <Col xs={1} sm={2} lg={4}></Col>
      <Col xs={22} sm={20} lg={16}>
        <div className="buy">
          <h1 className="buy__titulo">Productos en el carrito</h1>
          <CartDetail />
          <BuyAddressForm />
        </div>
      </Col>
      <Col xs={1} sm={2} lg={4}></Col>
    </Row>
  );
}

export default Buy;
