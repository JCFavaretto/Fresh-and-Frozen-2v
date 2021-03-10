import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, Checkbox, Select, Spin } from "antd";
import { useHistory } from "react-router";

import { firebase } from "Fire";
import { updateUserFire } from "Fire/user";
import { setBuyOrderFire } from "Fire/orders";

import useAuth from "hooks/useAuth";
import Carrito from "providers/CartProvider";

import "components/Web/BuyAddressForm/BuyAddressForm.scss";
import { toast } from "react-toastify";

function BuyAddressForm() {
  const history = useHistory();
  const { Option } = Select;
  const [direccion, setDireccion] = useState({
    calle: "",
    altura: "",
    depto: "",
    piso: "",
    telefono: "",
  });
  const [deliveryDay, setDeliveryDay] = useState(null);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [{ cart, setCart, emptyStorage, totalGasto }] = useContext(Carrito);

  function saveAddressData(e) {
    setSave(e.target.checked);
  }

  function handleBuy(e) {
    e.preventDefault();
    if (direccion.calle === "" || direccion.altura === "") {
      toast.error("Debe agregar dirreción de entrega.");
    } else if (direccion.telefono === "") {
      toast.error("Debe ingresar un numero de telefono.");
    } else if (!deliveryDay) {
      toast.error("Seleccione dia de entrega.");
    } else {
      setLoading(true);
      const order = {
        comprador: user.uid,
        nombre: user.name + " " + user.lastName,
        calle: direccion.calle,
        altura: direccion.altura,
        depto: direccion.depto,
        piso: direccion.piso,
        telefono: direccion.telefono,
        entregado: false,
        cancelada: false,
        onTheWay: false,
        cart: cart,
        total: totalGasto(),
        deliveryDay,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      if (save) {
        updateUserFire(direccion, user);
      }
      setBuyOrderFire(order, setCart, emptyStorage, setLoading);
    }
  }

  useEffect(() => {
    if (user) {
      if (user.calle) {
        setDireccion({
          ...direccion,
          calle: user.calle,
          altura: user.altura,
          piso: user.piso,
          depto: user.depto,
          telefono: user.telefono,
        });
      }
    }
  }, [user]); //eslint-disable-line

  useEffect(() => {
    if (cart.length === 0) {
      history.push("/");
    }
  }, [cart]); //eslint-disable-line

  return (
    <Form className="address-form" onSubmitCapture={(e) => handleBuy(e)}>
      <h1 className="address-form__titulo">Datos de envio</h1>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              placeholder="Calle*"
              value={direccion.calle}
              onChange={(e) =>
                setDireccion({ ...direccion, calle: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="number"
              placeholder="Altura*"
              value={direccion.altura}
              onChange={(e) =>
                setDireccion({ ...direccion, altura: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              placeholder="Piso"
              value={direccion.piso}
              onChange={(e) =>
                setDireccion({ ...direccion, piso: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              placeholder="Departamento"
              value={direccion.depto}
              onChange={(e) =>
                setDireccion({ ...direccion, depto: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>{" "}
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Input
              type="number"
              placeholder="Telefono*"
              value={direccion.telefono}
              onChange={(e) =>
                setDireccion({ ...direccion, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Las entregas son entre las 12:00 y las 14:00 horas">
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
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col style={{ margin: "1rem auto" }} span={15}>
          <Checkbox checked={save} onChange={saveAddressData}>
            Guardar datos{" "}
          </Checkbox>
        </Col>
      </Row>
      <Form.Item>
        <div className="address-form__btn-comprar">
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? <Spin /> : "Comprar"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default BuyAddressForm;
