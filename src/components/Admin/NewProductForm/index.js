import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col, Checkbox } from "antd";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import noAvatar from "assets/img/no-avatar.png";
import { getAccessToken } from "API/auth";
import { crearProductoApi, uploadImgProductApi } from "API/product";

import "components/Admin/NewProductForm/NewProductForm.scss";

function NewProductForm({ setModalVisible, setReloadProducts }) {
  const initialState = {
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
    oferta: false,
  };
  const [img, setImg] = useState(null);
  const [productData, setProductData] = useState(initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    if (img === null) {
      toast.error("Debe agregar una imagen para el producto.");
      return;
    }

    let uploadProducto = productData;
    const token = getAccessToken();
    let res = await crearProductoApi(token, uploadProducto);
    if (!res.ok) {
      if (
        res.err &&
        res.err.message ===
          "Product validation failed: nombre: Ese nombre ya existe."
      ) {
        toast.error("Ya existe un producto con ese nombre.");
      } else {
        toast.error(res.message);
      }
      return;
    } else {
      console.log(img);
      let producto = res.producto;
      producto.img = img.file;
      if (typeof producto.img === "object") {
        let res2 = await uploadImgProductApi(token, producto.img, producto._id);
        if (!res2.ok) {
          toast.error(res2.message);
          return;
        } else {
          toast.success("Producto creado correctamente.");
          setProductData(initialState);
          setImg(null);
          setModalVisible(false);
          setReloadProducts(true);
        }
      }
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
        Crear producto
      </Button>
    </Form>
  );
}

export default NewProductForm;
