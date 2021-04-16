const basepath =
  "https://us-central1-fresh-and-frozen-c300d.cloudfunctions.net/checkout";
const devBasePath =
  "http://localhost:5000/fresh-and-frozen-c300d/us-central1/checkout";

export function checkOutMercadoPago(items, orderId) {
  const url = `${basepath}/create_preference`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items, orderId }),
  };
  fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      window.location.href = res.url;
    })
    .catch((err) => {
      console.log(err);
    });
}
