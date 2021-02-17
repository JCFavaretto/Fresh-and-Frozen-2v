import React, { useState } from "react";
import { Button } from "antd";

import { ShoppingCartOutlined } from "@ant-design/icons";
import Modal from "components/Modal";
import Cart from "components/Web/Cart";

function CartIcon({ className }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  function verCarrito() {
    setModalVisible(true);
    setModalTitle("Carrito");
    setModalContent(<Cart setVisible={setModalVisible} />);
  }
  return (
    <>
      <Modal
        title={modalTitle}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      >
        {modalContent}
      </Modal>
      <Button onClick={verCarrito}>
        <ShoppingCartOutlined />
      </Button>
    </>
  );
}

export default CartIcon;
