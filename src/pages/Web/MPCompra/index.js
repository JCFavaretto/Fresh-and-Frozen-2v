import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import "pages/Web/MPCompra/MPCompra.scss";
import { getLastOrder, updateMPStatus } from "Fire/orders";
import useAuth from "hooks/useAuth";
import { Spin } from "antd";

function MPCompra() {
  const { payment_id, status } = useParams();
  //   console.log("payment: " + payment_id);
  //   console.log("status: " + status);
  const [order, setOrder] = useState(null);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      getLastOrder(user.uid, setOrder);
    }
  }, [user]); //eslint-disable-line

  useEffect(() => {
    if (order) {
      updateMPStatus(order, payment_id, status);
    }
  }, [order]);

  return (
    <div className="mp-landing">
      <h2 className="mp-landing__titulo">
        {status === "approved"
          ? "Compra exitosa!"
          : status === "rejected"
          ? "Compra rechaza"
          : "Pago pendiente"}
      </h2>
      {isLoading ? (
        <Spin style={{ display: "block", margin: "0 auto" }} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MPCompra;
