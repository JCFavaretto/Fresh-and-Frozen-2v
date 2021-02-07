import React from "react";
import { Modal as ModalAnt } from "antd";

function Modal({ children, title, isVisible, setIsVisible }) {
  return (
    <ModalAnt
      title={title}
      centered
      visible={isVisible}
      onCancel={() => {
        setIsVisible(false);
      }}
      footer={false}
    >
      {children}
    </ModalAnt>
  );
}

export default Modal;
