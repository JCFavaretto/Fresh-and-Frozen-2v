import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import useAuth from "hooks/useAuth";
import { getOrders } from "Fire/orders";
import { Helmet } from "react-helmet";

import SelectOrders from "components/Web/SelectOrders";

import "pages/Web/Orders/Orders.scss";
import OrderDetail from "components/Web/OrderDetail";

function Orders() {
  const { user, isLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reloadOrders, setReloadOrders] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      getOrders(user.uid, setOrders, setLoading);
      if (reloadOrders) {
        setReloadOrders(false);
      }
    }
  }, [user, reloadOrders]); //eslint-disable-line

  return (
    <>
      <Helmet>
        <title>Mis Compras | Pescaderia Fresh&Frozen</title>
        <meta name="description" content="Compras Fresh&Frozen Pescaderia" />
      </Helmet>
      <Row style={{ minHeight: "82vh" }}>
        <Col xs={1} sm={2} lg={4}></Col>
        <Col xs={22} sm={20} lg={16}>
          <div className="ordenes">
            <h2 className="ordenes__titulo">Mis Compras</h2>
            {!loading ? (
              <>
                {orders.length > 0 ? (
                  <>
                    <SelectOrders
                      orders={orders}
                      order={order}
                      setOrder={setOrder}
                    />
                    <OrderDetail
                      order={orders[order]}
                      setReloadOrders={setReloadOrders}
                    />
                  </>
                ) : (
                  <h3>No tiene compras</h3>
                )}
              </>
            ) : (
              <Spin style={{ margin: "0 auto" }} />
            )}
          </div>
        </Col>
        <Col xs={1} sm={2} lg={4}></Col>
      </Row>
    </>
  );
}

export default Orders;
