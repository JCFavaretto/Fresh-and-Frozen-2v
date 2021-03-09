import React, { useEffect, useState } from "react";

import { getProductsActiveFire } from "Fire/product";

import ListProducts from "components/Admin/ListProducts";

import "pages/Admin/Products/Products.scss";

function Products() {
  const [productsActive, setProductsActive] = useState([]);
  const [productsInactive, setProductsInactive] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);

  useEffect(() => {
    getProductsActiveFire(true, setProductsActive);
    getProductsActiveFire(false, setProductsInactive);
    setReloadProducts(false);
  }, [reloadProducts]); //eslint-disable-line

  return (
    <div className="menu-productos">
      <h1 className="menu-productos__titulo">Menu Productos</h1>
      <ListProducts
        productsActive={productsActive}
        productsInactive={productsInactive}
        setReloadProducts={setReloadProducts}
      />
    </div>
  );
}

export default Products;
