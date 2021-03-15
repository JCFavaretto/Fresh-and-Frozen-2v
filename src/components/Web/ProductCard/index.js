import React from "react";
import { Col, Button } from "antd";

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
      xl={8}
      style={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="product-card" onClick={productDetail}>
        <img
          className="product-card__img"
          alt={producto.descripcion}
          src={producto.img}
        />
        <div className="product-card__data">
          <p>{producto.nombre}</p>
          <Button type="primary">${producto.precio}</Button>
        </div>
      </div>
    </Col>
  );
}

export default ProductCard;
