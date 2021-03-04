import React from "react";
import { Col, Card, Button } from "antd";

import "components/Web/ProductCard/ProductCard.scss";
import ProductDetail from "../ProductDetail";

function ProductCard({
  producto,
  setModalVisible,
  setModalTitle,
  setModalContent,
}) {
  function productDetail() {
    setModalVisible(true);
    setModalTitle(producto.nombre);
    setModalContent(
      <ProductDetail producto={producto} setModalVisible={setModalVisible} />
    );
  }

  return (
    <Col
      md={10}
      lg={8}
      xl={6}
      style={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <Card
        className="card-producto"
        hoverable
        onClick={productDetail}
        cover={
          <img
            className="card-producto__img"
            alt={producto.descripcion}
            src={producto.img}
          />
        }
      >
        {producto.nombre}
        <Button type="primary">${producto.precio}</Button>
      </Card>
    </Col>
  );
}

export default ProductCard;
