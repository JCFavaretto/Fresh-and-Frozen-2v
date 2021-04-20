import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import {
  getProductsFire,
  getCategoryProductsFire,
  getOnSaleProductsFire,
} from "Fire/product";
import ProductList from "components/Web/ProductList";

import "pages/Web/Products/Products.scss";
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
    <>
      <Helmet>
        <title>
          {!categoria
            ? "Productos | Pescaderia Fresh&Frozen"
            : `${
                categoria.charAt(0).toUpperCase() + categoria.slice(1)
              } | Pescaderia Fresh&Frozen`}
        </title>
        <meta name="description" content="Productos Fresh&Frozen Pescaderia" />
      </Helmet>
      <div className="pagina-productos">
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
      </div>
    </>
  );
}

export default Products;
