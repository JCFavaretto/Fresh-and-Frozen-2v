import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { toast } from "react-toastify";

import CarouselOfertas from "components/Web/CarouselOfertas";
import { getOnSaleProductsApi } from "API/product";

import "pages/Web/Home/Home.scss";

function Home() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    getOnSaleProductsApi().then((res) => {
      if (!res.ok) {
        toast.error(res.message);
      } else {
        setProductos(res.productos);
      }
    });
  }, []);

  return (
    <div className="home" style={{ minHeight: "82vh" }}>
      <div className="home__banner"></div>
      <Row className="home__carousel">
        <Col xs={1} sm={2}></Col>
        <Col xs={22} sm={20}>
          <CarouselOfertas productos={productos} />
        </Col>
        <Col xs={1} sm={2}></Col>
      </Row>
    </div>
  );
}

export default Home;
