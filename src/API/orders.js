import { basepath } from "API/config";

export function crearOrdenCompraApi(token, order) {
  const url = `${basepath}/comprar`;
  const params = {
    method: "POST",
    body: JSON.stringify(order),
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
