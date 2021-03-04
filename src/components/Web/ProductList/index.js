import React, { useState } from "react";
import { Row } from "antd";
import Modal from "components/Modal";
import ProductCard from "components/Web/ProductCard";

import "components/Web/ProductList/ProductList.scss";

function ProductList({ productos }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <Row className="lista-productos" gutter={24}>
      <Modal
        title={modalTitle}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      >
        {modalContent}
      </Modal>
      {productos.map((item) => {
        return (
          <ProductCard
            key={item.id}
            producto={item}
            setModalVisible={setModalVisible}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
          />
        );
      })}
    </Row>
  );
}

export default ProductList;
