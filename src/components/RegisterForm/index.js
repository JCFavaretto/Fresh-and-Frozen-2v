import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import {
  emailValidation,
  namesValidation,
  minLengthValidation,
} from "utils/formValidation";
import { signUpFire } from "Fire/user";

import "components/RegisterForm/RegisterForm.scss";

export default function RegisterForm({ setReloadUsers = false }) {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [formValid, setFormValid] = useState({
    name: false,
    lastName: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  function changeForm(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function inputValidation(e) {
    const { name } = e.target;
    if (name === "name" || name === "lastName") {
      setFormValid({
        ...formValid,
        [name]: namesValidation(e.target),
      });
    } else if (name === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    } else {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 8),
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid.name || !formValid.lastName) {
      toast.error("Formato invalido en el nombre.");
    } else if (!formValid.lastName) {
      toast.error("Formato invalido en el apellido.");
    } else if (!formValid.email) {
      toast.error("Formato invalido en el email.");
    } else if (!formValid.password) {
      toast.error("La contraseña debe tener un minimo de 8 caracteres.");
    } else if (inputs.password !== inputs.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
    } else {
      await signUpFire(inputs);
      setInputs({
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
      if (setReloadUsers) {
        setReloadUsers(true);
      }
    }
  };

  return (
    <Form
      className="register-form"
      onSubmitCapture={handleSubmit}
      onChange={changeForm}
    >
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="text"
          name="name"
          placeholder="Nombre"
          className="register-form__input"
          value={inputs.name}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="text"
          name="lastName"
          placeholder="Apellido"
          className="register-form__input"
          value={inputs.lastName}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          value={inputs.email}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          value={inputs.password}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0, 0.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repita la contraseña"
          className="register-form__input"
          value={inputs.repeatPassword}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
}
