import React from "react";
import { Modal as ModalAnt } from "antd";

function Modal({ children, title, isVisible, setIsVisible, ...other }) {
  return (
    <ModalAnt
      title={title}
      centered
      visible={isVisible}
      onCancel={() => {
        setIsVisible(false);
      }}
      footer={false}
      {...other}
    >
      {children}
    </ModalAnt>
  );
}

export default Modal;
