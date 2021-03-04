import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, Checkbox } from "antd";

import { firebase } from "Fire";
import { updateUserFire } from "Fire/user";
import { setBuyOrderFire } from "Fire/orders";

import useAuth from "hooks/useAuth";
import Carrito from "providers/CartProvider";

import "components/Web/BuyAddressForm/BuyAddressForm.scss";

function BuyAddressForm() {
  const [direccion, setDireccion] = useState({
    calle: "",
    altura: "",
    depto: "",
    piso: "",
    telefono: "",
    entregado: false,
  });
  const [save, setSave] = useState(false);

  const { user } = useAuth();
  const [{ cart, setCart, emptyStorage, totalGasto }] = useContext(Carrito);

  function saveAddressData(e) {
    setSave(e.target.checked);
  }

  async function handleBuy(e) {
    e.preventDefault();
    const order = {
      comprador: user.id,
      calle: direccion.calle,
      altura: direccion.altura,
      depto: direccion.depto,
      piso: direccion.piso,
      telefono: direccion.telefono,
      cart: cart,
      total: totalGasto(),
      date: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    if (save) {
      updateUserFire(direccion, user);
    }
    setBuyOrderFire(order, setCart, emptyStorage);
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
        setSave(true);
      }
    }
  }, [user]); //eslint-disable-line

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
              placeholder="Departamento"
              value={direccion.depto}
              onChange={(e) =>
                setDireccion({ ...direccion, depto: e.target.value })
              }
            />
          </Form.Item>
        </Col>
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
      </Row>
      <Row gutter={24}>
        <Col style={{ margin: "0 auto" }} span={20}>
          <Checkbox checked={save} onChange={saveAddressData}>
            Guardar datos{" "}
          </Checkbox>
        </Col>
      </Row>
      <Form.Item>
        <div className="address-form__btn-comprar">
          <Button type="primary" htmlType="submit">
            Comprar
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default BuyAddressForm;
