import React, { useState } from "react";
import { Col, Card, Button } from "antd";

import { getImgProductoApi } from "API/product";

import "components/Web/ProductCard/ProductCard.scss";

function ProductCard({
  producto,
  setModalVisible,
  setModalTitle,
  setModalContent,
}) {
  const { Meta } = Card;
  const [imgSrc, setImgSrc] = useState(null);

  getImgProductoApi(producto.img).then((res) => {
    setImgSrc(res);
  });

  function productDetail() {
    setModalVisible(true);
    setModalTitle(producto.nombre);
    setModalContent(producto.precio);
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
            src={imgSrc}
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
