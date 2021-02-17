import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getProductsApi,
  getCategoryProductsApi,
  getOnSaleProductsApi,
} from "API/product";
import ProductList from "components/Web/ProductList";

import "pages/Web/Products/Products.scss";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

function Products() {
  const [productos, setProductos] = useState([]);
  const [count, setCount] = useState(0);

  const { categoria } = useParams();

  useEffect(() => {
    if (!categoria) {
      getProductsApi().then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          setProductos(res.productos);
          setCount(res.conteo);
        }
      });
    } else if (categoria === "promociones") {
      getOnSaleProductsApi().then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          setProductos(res.productos);
          setCount(res.conteo);
        }
      });
    } else {
      getCategoryProductsApi(categoria).then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          setProductos(res.productos);
          setCount(res.conteo);
        }
      });
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
        <ProductList productos={productos} count={count} />
      </Col>
      <Col xs={1} sm={2}></Col>
    </Row>
  );
}

export default Products;
