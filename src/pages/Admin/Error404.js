import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Error404() {
  return (
    <div>
      <h1>ERROR 404</h1>
      <h2>La pagina que se esta buscando no existe</h2>
      <Button>
        <Link to="/admin">Volver al Inicio de Admin</Link>
      </Button>
    </div>
  );
}

export default Error404;
