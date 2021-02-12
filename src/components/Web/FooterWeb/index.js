import React from "react";
import { Layout } from "antd";
import facebook from "assets/img/facebook.svg";
import instagram from "assets/img/instagram.svg";
import whatsapp from "assets/img/whatsapp.svg";

import "components/Web/FooterWeb/FooterWeb.scss";

function FooterWeb() {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <p className="footer__sociales">Nuestras Redes Sociales</p>
      <div className="footer__iconos">
        <a
          href="https://www.facebook.com/freshandfrozen.pescaderia"
          rel="noreferrer"
          target="_blank"
          style={{
            color: "var(--light)",
          }}
        >
          <img src={facebook} width="35px" alt="F" />
        </a>
        <a
          href="https://www.instagram.com/freshandfrozen.pescaderia"
          rel="noreferrer"
          target="_blank"
          style={{
            color: "var(--light)",
          }}
        >
          <img src={instagram} width="35px" alt="F" />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=542234220714&text=Buenas! Quisiera conocer mas sobre los productos que ofreces"
          rel="noreferrer"
          target="_blank"
          style={{
            padding: "0",
            margin: "0",
          }}
        >
          <img src={whatsapp} width="35px" alt="F" />
        </a>
      </div>
      <p className="footer__copy">
        Copyright Fresh&Frozen - {new Date().getFullYear()}. Todos los derechos
        reservados.
      </p>
    </Footer>
  );
}

export default FooterWeb;
