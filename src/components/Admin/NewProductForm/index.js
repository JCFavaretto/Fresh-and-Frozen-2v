import React, { useCallback, useState } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col, Checkbox } from "antd";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import noAvatar from "assets/img/no-avatar.png";
import { uploadImgProductFire } from "Fire/product";

import "components/Admin/NewProductForm/NewProductForm.scss";

function NewProductForm({ setModalVisible, setReloadProducts }) {
  const initialState = {
    nombre: "",
    precio: "",
    stock: "",
    cat: "",
    descripcion: "",
    onSale: false,
    active: true,
  };
  const [img, setImg] = useState(null);
  const [productData, setProductData] = useState(initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    if (img === null) {
      toast.warn("Debe agregar una imagen para el producto.");
      return;
    } else if (productData.nombre === "") {
      toast.warn("Debe agregar un nombre para el producto.");
      return;
    } else if (productData.precio === "") {
      toast.warn("Debe agregar un precio para el producto.");
      return;
    } else if (productData.stock === "") {
      toast.warn("Debe agregar el stock para el producto.");
      return;
    } else if (productData.cat === "") {
      toast.warn("Debe agregar la categoria del producto.");
      return;
    } else if (productData.descripcion === "") {
      toast.warn("Debe agregar una descripcion para el producto.");
      return;
    }

    let uploadProducto = productData;

    uploadImgProductFire(
      uploadProducto,
      img,
      setImg,
      setReloadProducts,
      setProductData,
      initialState,
      setModalVisible
    );
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImg(file);
      setImgUrl(URL.createObjectURL(file));
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
              onChange={(e) => setProductData({ ...productData, cat: e })}
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
            checked={productData.onSale}
            onChange={(e) =>
              setProductData({ ...productData, onSale: e.target.checked })
            }
          >
            En oferta
          </Checkbox>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" className="btn-submit">
        Crear producto
      </Button>
    </Form>
  );
}

export default NewProductForm;
