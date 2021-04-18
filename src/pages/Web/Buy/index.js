import React, { useContext } from "react";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";

import CartDetail from "components/Web/CartDetail";

import "pages/Web/Buy/Buy.scss";
import BuyAddressForm from "components/Web/BuyAddressForm";
import Carrito from "providers/CartProvider";

function Buy() {
  const [{ cart, removeFromCart, totalGasto }] = useContext(Carrito);

  return (
    <>
      <Helmet>
        <title>Compra | Pescaderia Fresh&Frozen</title>
        <meta name="description" content="Compra Fresh&Frozen Pescaderia" />
      </Helmet>
      <Row style={{ minHeight: "82vh" }}>
        <Col xs={1} sm={2} lg={4}></Col>
        <Col xs={22} sm={20} lg={16}>
          <div className="buy">
            <h1 className="buy__titulo">Productos en el carrito</h1>
            <CartDetail
              cart={cart}
              removeFromCart={removeFromCart}
              totalGasto={totalGasto()}
            />
            <BuyAddressForm />
          </div>
        </Col>
        <Col xs={1} sm={2} lg={4}></Col>
      </Row>
    </>
  );
}

export default Buy;
