import React from "react";
import LoadRouters from "components/LoadRouters";

import "layouts/LayoutBasic.scss";
import MenuTop from "components/Web/MenuTop";
import FooterWeb from "components/Web/FooterWeb/index.js";
import { CartProvider } from "providers/CartProvider";

function LayoutBasic({ routes }) {
  return (
    <>
      <CartProvider>
        <MenuTop />
        {/* <Row>
        <Col xs={1} sm={2} lg={4}></Col>
        <Col xs={22} sm={20} lg={16}>
        </Col>
        <Col xs={1} sm={2} lg={4}></Col>
      </Row> */}

        <LoadRouters routes={routes} />
        <FooterWeb />
      </CartProvider>
    </>
  );
}

export default LayoutBasic;
