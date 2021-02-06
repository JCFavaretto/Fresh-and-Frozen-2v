import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "utils/constants";
import { loginAPI } from "API/user";

import "components/LoginForm/LoginForm.scss";

function LoginForm() {
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

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await loginAPI(inputs);

    if (!result.ok) {
      if (
        result.message &&
        (result.message === "Usuario no encontrado" ||
          result.message === "La contraseña es incorrecta")
      ) {
        toast.error("Usuario y/o contraseña incorrectos");
      } else {
        toast.error("Error en la base de datos. Intente mas tarde.");
      }
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      toast.success("Login correcto");

      window.location.href = "/admin";
    }
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
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          value={inputs.password}
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
