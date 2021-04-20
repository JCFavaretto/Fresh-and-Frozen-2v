import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Row, Col, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { resetUserPass } from "Fire/user";

import "pages/Web/ResetPass/ResetPass.scss";
import { toast } from "react-toastify";

function Reset() {
  const [email, setEmail] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function emailValidation(email) {
    // eslint-disable-next-line no-useless-escape
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const resultValidation = emailValid.test(email);

    if (resultValidation) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (emailValidation(email)) {
      resetUserPass(email);
    } else {
      toast.error("Formato de email incorrecto");
    }
  }

  return (
    <>
      <Helmet>
        <title>Restablecer contraseña | Pescaderia Fresh&Frozen</title>
        <meta
          name="description"
          content="Login Register Fresh&Frozen Pescaderia"
        />
      </Helmet>
      <Row style={{ minHeight: "82vh" }}>
        <Col xs={1} sm={2} lg={4}></Col>
        <Col xs={22} sm={20} lg={16}>
          <div className="reset-pass">
            <h3 className="reset-pass__titulo">Restablecer Contraseña</h3>
            <Form
              className="login-form"
              onSubmitCapture={handleSubmit}
              onChange={handleChange}
            >
              <Form.Item>
                <Input
                  prefix={
                    <MailOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />
                  }
                  type="email"
                  name="email"
                  placeholder="Correo electronico"
                  className="login-form__input"
                  value={email}
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                  Restablecer Contraseña
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={1} sm={2} lg={4}></Col>
      </Row>
    </>
  );
}

export default Reset;
