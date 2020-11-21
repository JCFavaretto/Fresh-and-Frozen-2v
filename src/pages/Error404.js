import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div>
      <h1>ERROR 404</h1>
      <h2>La pagina que se esta buscando no existe</h2>
      <Button>
        <Link to="/">Volver al Inicio</Link>
      </Button>
    </div>
  );
}

export default Error404;
