import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Checkbox,
  Spin,
} from "antd";
import { useDropzone } from "react-dropzone";
import noAvatar from "assets/img/no-avatar.png";

import { updateImgProductFire, updateProductFire } from "Fire/product";

import "components/Admin/ProductForm/ProductForm.scss";

function ProductForm({ producto, setModalVisible, setReloadProducts }) {
  const [img, setImg] = useState(null);
  const [productData, setProductData] = useState(producto);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductData(producto);
    setImg(producto.img);
  }, [producto]);

  async function handleSubmit(e) {
    e.preventDefault();
    let uploadProducto = productData;
    setLoading(true);
    if (typeof img === "object") {
      updateImgProductFire(
        uploadProducto,
        img,
        setModalVisible,
        setReloadProducts,
        setLoading
      );
    } else {
      updateProductFire(
        uploadProducto,
        setModalVisible,
        setReloadProducts,
        setLoading
      );
    }
  }

  return (
    <div className="product-form">
      <UploadImg img={img} setImg={setImg} />
      <ProductDataForm
        productData={productData}
        setProductData={setProductData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

function UploadImg({ img, setImg }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (img !== null && typeof img === "object") {
      setImgUrl(URL.createObjectURL(img));
    } else {
      setImgUrl(img);
    }
  }, [img]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImg(file);
    },
    [setImg]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/jpg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-img" {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <Avatar size={150} src={noAvatar} />
      ) : (
        <Avatar size={150} src={imgUrl} />
      )}
    </div>
  );
}

function ProductDataForm({
  productData,
  setProductData,
  handleSubmit,
  loading,
}) {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <Form className="form-edit" onSubmitCapture={handleSubmit}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              placeholder="Nombre"
              value={productData.nombre}
              onChange={(e) =>
                setProductData({ ...productData, nombre: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="number"
              prefix={<span>$</span>}
              suffix={<span>kg.</span>}
              placeholder="Precio"
              value={productData.precio}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  precio: Number(e.target.value),
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="number"
              suffix={<span>kg.</span>}
              placeholder="Stock"
              value={productData.stock}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  stock: Number(e.target.value),
                })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Categoria"
              onChange={(e) => setProductData({ ...productData, cat: e })}
              value={productData.cat}
            >
              <Option value="frescos">Fresco</Option>
              <Option value="congelados">Congelado</Option>
              <Option value="rebozados">Rebozado</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <TextArea
            value={productData.descripcion}
            onChange={(e) => {
              setProductData({ ...productData, descripcion: e.target.value });
            }}
            placeholder="Descripci??n del producto"
            autoSize={{ minRows: 2, maxRows: 5 }}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          span={12}
          style={{
            margin: "1rem auto",
            padding: "0.5rem 0.8rem",
            border: "1px solid #d9d9d9",
          }}
        >
          <Checkbox
            checked={productData.onSale}
            onChange={(e) =>
              setProductData({ ...productData, onSale: e.target.checked })
            }
          >
            En oferta
          </Checkbox>
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        className="btn-submit"
        disabled={loading}
      >
        {loading ? <Spin /> : "Actualizar producto"}
      </Button>
    </Form>
  );
}

export default ProductForm;
