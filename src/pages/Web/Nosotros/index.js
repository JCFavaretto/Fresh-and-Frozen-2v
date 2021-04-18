import React from "react";
import { Helmet } from "react-helmet";

import { Col, Row } from "antd";

import "pages/Web/Nosotros/Nosotros.scss";
function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Pescaderia Fresh&Frozen</title>
        <meta name="description" content="Nosotros Fresh&Frozen Pescaderia" />
      </Helmet>
      <Row style={{ minHeight: "82vh" }}>
        <Col xs={1} sm={2} lg={4}></Col>
        <Col xs={22} sm={20} lg={16}>
          <div className="nosotros">
            {" "}
            <h3 className="nosotros__titulo">Sobre nosotros</h3>
            <p className="nosotros__texto-principal">
              Somos un emprendimiento familiar. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Vel, et delectus? Ipsa nisi possimus
              similique quo amet, eum saepe dolorum architecto dolore animi sed
              asperiores ad. Sint voluptas nisi rem.
            </p>
            <h4 className="nosotros__sub-titulo">Metodos de trabajo</h4>
            <ul className="nosotros__lista">
              <li>Dias y Horarios de Reparto</li>
              <li>Formas de pago</li>
              <li>Mas informacion</li>
            </ul>
          </div>
        </Col>
        <Col xs={1} sm={2} lg={4}></Col>
      </Row>
    </>
  );
}

export default Nosotros;
