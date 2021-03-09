import React, { useEffect, useState } from "react";
import { Select, Tabs } from "antd";

import {
  getDailyOrders,
  getOnTheWayOrders,
  getDeliveredOrders,
  getCanceledOrders,
} from "Fire/orders";

import "pages/Admin/Orders/Orders.scss";
import ListOrders from "components/Admin/ListOrders";

function Orders() {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [deliveryDay, setDeliveryDay] = useState("lunes");
  const [orders, setOrders] = useState([]);
  const [reloadOrders, setReloadOrders] = useState(false);
  const [onTheWayOrders, setOntheWayOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  useEffect(() => {
    let dia = new Date().getDay();
    if (dia === 2) {
      setDeliveryDay("martes");
    } else if (dia === 3) {
      setDeliveryDay("miercoles");
    } else if (dia === 4) {
      setDeliveryDay("jueves");
    } else if (dia === 5) {
      setDeliveryDay("viernes");
    } else {
      setDeliveryDay("lunes");
    }
  }, []);

  useEffect(() => {
    getDailyOrders(deliveryDay, setOrders);
    getOnTheWayOrders(deliveryDay, setOntheWayOrders);
    getDeliveredOrders(deliveryDay, setDeliveredOrders);
    getCanceledOrders(deliveryDay, setCanceledOrders);

    if (reloadOrders) {
      setReloadOrders(false);
    }
  }, [deliveryDay, reloadOrders]); //eslint-disable-line

  return (
    <div className="list-orders">
      <h1 className="list-orders__titulo">Ordenes de Compra</h1>
      <div className="list-orders__header">
        <div className="list-orders__header-select">
          <Select
            placeholder="Dia de entrega"
            onChange={(e) => setDeliveryDay(e)}
            value={deliveryDay}
            required
          >
            <Option value="lunes">Lunes</Option>
            <Option value="martes">Martes</Option>
            <Option value="miercoles">Miercoles</Option>
            <Option value="jueves">Jueves</Option>
            <Option value="viernes">Viernes</Option>
          </Select>
        </div>
      </div>
      <div className="list-orders__list">
        <Tabs type="card" tabPosition="top">
          <TabPane tab={<span>Nuevas</span>} key="1">
            <ListOrders orders={orders} setReloadOrders={setReloadOrders} />
          </TabPane>
          <TabPane tab={<span>En Camino</span>} key="2">
            <ListOrders
              orders={onTheWayOrders}
              setReloadOrders={setReloadOrders}
            />
          </TabPane>
          <TabPane tab={<span>Entregados</span>} key="3">
            <ListOrders
              orders={deliveredOrders}
              setReloadOrders={setReloadOrders}
            />
          </TabPane>
          <TabPane tab={<span>Cancelados</span>} key="4">
            <ListOrders
              orders={canceledOrders}
              setReloadOrders={setReloadOrders}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Orders;
