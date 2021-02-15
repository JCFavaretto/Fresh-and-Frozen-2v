import { basepath } from "API/config";

export function getProductsActiveApi(token, status) {
  const url = `${basepath}/productos-activos?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.err);
      return err;
    });
}

export function uploadImgProductApi(token, img, id) {
  const url = `${basepath}/upload/productos/${id}`;
  const formData = new FormData();
  formData.append("archivo", img, img.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      authorization: token,
    },
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function getImgProductoApi(nombreImg) {
  const url = `${basepath}/imagen/productos/${nombreImg}`;

  return fetch(url)
    .then((res) => {
      return res.url;
    })
    .catch((err) => {
      return err;
    });
}

export function changeProductStatus(token, active, idProducto) {
  const url = `${basepath}/cambiar-estado-producto/${idProducto}`;
  const params = {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ active }),
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.err);
      return err;
    });
}

export function updateProductApi(token, producto, idProducto) {
  const url = `${basepath}/editar-producto/${idProducto}`;
  const params = {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  };
  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function crearProductoApi(token, producto) {
  const url = `${basepath}/crear-producto`;
  const params = {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function borrarProductoApi(token, productoId) {
  const url = `${basepath}/eliminar-producto/${productoId}`;
  const params = {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function getProductsApi() {
  const url = `${basepath}/obtener-productos`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.err);
      return err;
    });
}
