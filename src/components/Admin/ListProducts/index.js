import React, { useEffect, useState } from "react";
import { Switch, List, Avatar, Button, Modal as ModalAnt } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import { getAccessToken } from "API/auth";
import {
  getImgProductoApi,
  changeProductStatus,
  borrarProductoApi,
} from "API/product";

import noAvatar from "assets/img/no-avatar.png";
import Modal from "components/Modal";
import ProductForm from "components/Admin/ProductForm";
import NewProductForm from "components/Admin/NewProductForm";

import "components/Admin/ListProducts/ListProducts.scss";
const { confirm } = ModalAnt;

function ListProducts({ productsActive, productsInactive, setReloadProducts }) {
  const [active, setActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  function addProductModal() {
    setModalVisible(true);
    setModalTitle("Crear nuevo producto");
    setModalContent(
      <NewProductForm
        setModalVisible={setModalVisible}
        setReloadProducts={setReloadProducts}
      />
    );
  }

  return (
    <div className="list-products">
      <div className="list-products__header">
        <div className="list-products__header-switch">
          <Switch
            defaultChecked
            onChange={() => {
              setActive((prev) => !prev);
            }}
          />
          {active ? "Productos Activos" : "Productos Inactivos"}
        </div>

        <Button type="primary" onClick={addProductModal}>
          <PlusOutlined style={{ fontSize: "1.1rem" }} />
        </Button>
      </div>

      {active ? (
        <ProductsActive
          productos={productsActive}
          setModalVisible={setModalVisible}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadProducts={setReloadProducts}
        />
      ) : (
        <ProductsInactive
          productos={productsInactive}
          setReloadProducts={setReloadProducts}
        />
      )}
      <Modal
        title={modalTitle}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function ProductsActive({
  productos,
  setModalVisible,
  setModalTitle,
  setModalContent,
  setReloadProducts,
}) {
  function activeModal(data) {
    setModalTitle(`Editar producto: ${data.nombre}`);
    setModalContent(
      <ProductForm
        producto={data}
        setModalVisible={setModalVisible}
        setReloadProducts={setReloadProducts}
      />
    ); //editproductForm
    setModalVisible(true);
  }

  return (
    <List
      className="products-active"
      itemLayout="horizontal"
      dataSource={productos}
      renderItem={(producto) => (
        <ProductActive
          producto={producto}
          activeModal={activeModal}
          setReloadProducts={setReloadProducts}
        />
      )}
    />
  );
}

function ProductActive({ producto, activeModal, setReloadProducts }) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (producto.img) {
      getImgProductoApi(producto.img).then((res) => {
        setImg(res);
      });
    }
  }, [producto]);

  function desactivarProducto(producto) {
    const token = getAccessToken();
    changeProductStatus(token, false, producto._id)
      .then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success("Producto desactivado");
        }
      })
      .finally(() => {
        setReloadProducts(true);
      });
  }

  function removeProduct(token, producto) {
    borrarProductoApi(token, producto._id)
      .then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
        }
      })
      .finally(() => {
        setReloadProducts(true);
      });
  }

  function showDeleteConfimation() {
    const token = getAccessToken();

    confirm({
      title: "Eliminando usuario",
      content: `¿Seguro de eliminar a ${producto.nombre}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => removeProduct(token, producto),
    });
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activeModal(producto)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => desactivarProducto(producto)}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfimation}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={img ? img : noAvatar} />}
        title={`${producto.nombre}`}
        description={`Precio: ${producto.precio} Stock: ${
          producto.stock
        } Oferta: ${producto.oferta ? "Si" : "No"}`}
      />
    </List.Item>
  );
}

function ProductsInactive({ productos, setReloadProducts }) {
  return (
    <List
      className="products-inactive"
      itemLayout="horizontal"
      dataSource={productos}
      renderItem={(producto) => (
        <ProductInactive
          producto={producto}
          setReloadProducts={setReloadProducts}
        />
      )}
    />
  );
}

function ProductInactive({ producto, setReloadProducts }) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (producto.img) {
      getImgProductoApi(producto.img).then((res) => {
        setImg(res);
      });
    }
  }, [producto]);

  function ActivarProducto(producto) {
    const token = getAccessToken();
    changeProductStatus(token, true, producto._id)
      .then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success("Producto activado.");
        }
      })
      .finally(() => {
        setReloadProducts(true);
      });
  }

  function removeProduct(token, producto) {
    borrarProductoApi(token, producto._id)
      .then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
        }
      })
      .finally(() => {
        setReloadProducts(true);
      });
  }

  function showDeleteConfimation() {
    const token = getAccessToken();

    confirm({
      title: "Eliminando usuario",
      content: `¿Seguro de eliminar a ${producto.nombre}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => removeProduct(token, producto),
    });
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => ActivarProducto(producto)}>
          <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfimation}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={img ? img : noAvatar} />}
        title={`${producto.nombre}`}
        description={`Precio: ${producto.precio} Stock: ${producto.stock} `}
      />
    </List.Item>
  );
}

export default ListProducts;
