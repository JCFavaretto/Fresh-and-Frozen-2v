import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col, Checkbox } from "antd";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import noAvatar from "assets/img/no-avatar.png";
import { getAccessToken } from "API/auth";
import {
  getImgProductoApi,
  uploadImgProductApi,
  updateProductApi,
} from "API/product";

import "components/Admin/ProductForm/ProductForm.scss";

function ProductForm({ producto, setModalVisible, setReloadProducts }) {
  const [img, setImg] = useState(null);
  const [productData, setProductData] = useState(producto);

  useEffect(() => {
    setProductData(producto);
  }, [producto]);

  useEffect(() => {
    if (producto.img) {
      getImgProductoApi(producto.img).then((res) => {
        setImg(res);
      });
    } else {
      setImg(null);
    }
  }, [producto]);

  useEffect(() => {
    if (img) {
      setProductData({ ...productData, img: img.file });
    }
  }, [img]); //eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();

    let uploadProducto = productData;
    const token = getAccessToken();

    if (uploadProducto.img !== null && typeof uploadProducto.img === "object") {
      let res2 = await uploadImgProductApi(
        token,
        uploadProducto.img,
        producto._id
      );
      if (!res2.ok) {
        toast.error(res2.message);
        return;
      } else {
        uploadProducto.img = res2.img;
      }
    }
    let res3 = await updateProductApi(token, uploadProducto, producto._id);
    if (!res3.ok) {
      toast.error(res3.message);
      return;
    } else {
      toast.success("Producto actualizado correctamente.");
      setModalVisible(false);
      setReloadProducts(true);
    }
  }

  return (
    <div className="product-form">
      <UploadImg img={img} setImg={setImg} />
      <ProductDataForm
        productData={productData}
        setProductData={setProductData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function UploadImg({ img, setImg }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (img) {
      if (img.preview) {
        setImgUrl(img.preview);
      } else {
        setImgUrl(img);
      }
    } else {
      setImgUrl(null);
    }
  }, [img]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImg({ file, preview: URL.createObjectURL(file) });
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
        <Avatar size={150} src={imgUrl ? imgUrl : noAvatar} />
      )}
    </div>
  );
}

function ProductDataForm({ productData, setProductData, handleSubmit }) {
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
                setProductData({ ...productData, precio: e.target.value })
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
                setProductData({ ...productData, stock: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Categoria"
              onChange={(e) => setProductData({ ...productData, categoria: e })}
              value={productData.categoria}
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
            placeholder="Descripción del producto"
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
            checked={productData.oferta}
            onChange={(e) =>
              setProductData({ ...productData, oferta: e.target.checked })
            }
          >
            En oferta
          </Checkbox>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" className="btn-submit">
        Actualizar producto
      </Button>
    </Form>
  );
}

export default ProductForm;
