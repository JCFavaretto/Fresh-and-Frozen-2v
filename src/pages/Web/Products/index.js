import React, { useEffect, useState } from "react";

import {
  getProductsFire,
  getCategoryProductsFire,
  getOnSaleProductsFire,
} from "Fire/product";
import ProductList from "components/Web/ProductList";

import "pages/Web/Products/Products.scss";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

function Products() {
  const [productos, setProductos] = useState([]);

  const { categoria } = useParams();

  useEffect(() => {
    if (!categoria) {
      getProductsFire(setProductos);
    } else if (categoria === "promociones") {
      getOnSaleProductsFire(setProductos);
    } else {
      getCategoryProductsFire(categoria, setProductos);
    }
  }, [categoria]); //eslint-disable-line

  return (
    <Row className="pagina-productos">
      <Col xs={1} sm={2}></Col>
      <Col xs={22} sm={20}>
        <h1 className="pagina-productos__titulo">
          {!categoria
            ? "Nuestros Productos"
            : categoria === "promociones"
            ? "Promociones"
            : categoria === "frescos"
            ? "Frescos"
            : categoria === "congelados"
            ? "Congelados"
            : "Rebozados"}
        </h1>
        <ProductList productos={productos} />
      </Col>
      <Col xs={1} sm={2}></Col>
    </Row>
  );
}

export default Products;
