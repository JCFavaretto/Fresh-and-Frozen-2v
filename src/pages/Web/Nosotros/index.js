import React from "react";

import "pages/Web/Nosotros/Nosotros.scss";
function Nosotros() {
  return (
    <div className="nosotros">
      {" "}
      <h3 className="nosotros__titulo">Sobre nosotros</h3>
      <p className="nosotros__texto-principal">
        Somos un emprendimiento familiar. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vel, et delectus? Ipsa nisi possimus similique quo
        amet, eum saepe dolorum architecto dolore animi sed asperiores ad. Sint
        voluptas nisi rem.
      </p>
      <h4 className="nosotros__sub-titulo">Metodos de trabajo</h4>
      <ul className="nosotros__lista">
        <li>Dias y Horarios de Reparto</li>
        <li>Formas de pago</li>
        <li>Mas informacion</li>
      </ul>
    </div>
  );
}

export default Nosotros;
