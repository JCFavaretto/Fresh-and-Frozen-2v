import React from "react";
import { Col, Row } from "antd";
import LoadRouters from "components/LoadRouters";

import "layouts/LayoutBasic.scss";
import MenuTop from "components/Web/MenuTop";
import FooterWeb from "components/Web/FooterWeb/index.js";

function LayoutBasic({ routes }) {
  return (
    <>
      <MenuTop />
      <Row style={{ minHeight: "72vh" }}>
        <Col xs={0} sm={2} lg={4}></Col>
        <Col xs={24} sm={20} lg={16}>
          <LoadRouters routes={routes} />
        </Col>
        <Col xs={0} sm={2} lg={4}></Col>
      </Row>
      <FooterWeb />
    </>
  );
}

export default LayoutBasic;
