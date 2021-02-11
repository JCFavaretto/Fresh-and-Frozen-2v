import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAccessToken } from "API/auth";
import { getProductsActiveApi } from "API/product";

import ListProducts from "components/Admin/ListProducts";

import "pages/Admin/Products/Products.scss";

function Products() {
  const [productsActive, setProductsActive] = useState([]);
  const [productsInactive, setProductsInactive] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);
  const token = getAccessToken();

  useEffect(() => {
    getProductsActiveApi(token, true).then((res) => {
      if (res.ok) {
        setProductsActive(res.productos);
      } else {
        toast.error(res.message);
      }
    });
    getProductsActiveApi(token, false).then((res) => {
      if (res.ok) {
        setProductsInactive(res.productos);
      } else {
        toast.error(res.message);
      }
    });
    setReloadProducts(false);
  }, [reloadProducts]); //eslint-disable-line

  return (
    <div className="menu-productos">
      <ListProducts
        productsActive={productsActive}
        productsInactive={productsInactive}
        setReloadProducts={setReloadProducts}
      />
    </div>
  );
}

export default Products;
