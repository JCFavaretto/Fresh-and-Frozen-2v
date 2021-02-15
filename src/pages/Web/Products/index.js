import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProductsApi } from "API/product";
import ProductList from "components/Web/ProductList";

import "pages/Web/Products/Products.scss";
import { Col, Row } from "antd";

function Products() {
  const [productos, setProductos] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getProductsApi().then((res) => {
      if (!res.ok) {
        toast.error(res.message);
      } else {
        setProductos(res.productos);
        setCount(res.conteo);
      }
    });
  }, []);

  return (
    <Row className="pagina-productos">
      <Col xs={1} sm={2}></Col>
      <Col xs={22} sm={20}>
        <ProductList productos={productos} count={count} />
      </Col>
      <Col xs={1} sm={2}></Col>
    </Row>
  );
}

export default Products;
