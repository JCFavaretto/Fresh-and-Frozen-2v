import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import google from "assets/img/google.svg";

import { loginFire, googleSignIn } from "Fire/user";

import "components/LoginForm/LoginForm.scss";

function LoginForm({ location }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  function changeForm(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function disabledLogin() {
    if (inputs.email === "" || inputs.password === "") {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginFire(inputs, location);
  }

  return (
    <Form
      className="login-form"
      onSubmitCapture={handleSubmit}
      onChange={changeForm}
    >
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: "1rem" }}>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          value={inputs.password}
        />
      </Form.Item>
      <Link
        style={{ textAlign: "right", display: "block" }}
        to="/reset-password"
      >
        Olvidaste tu contraseña?
      </Link>

      <Form.Item>
        <Button
          htmlType="submit"
          className="login-form__button"
          disabled={disabledLogin()}
        >
          Entrar
        </Button>
      </Form.Item>
      <Form.Item>
        <Button className="login-form__button-google" onClick={googleSignIn}>
          <img src={google} alt="" width="20" style={{ marginRight: "1rem" }} />{" "}
          Iniciar sesion con google
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(LoginForm);
