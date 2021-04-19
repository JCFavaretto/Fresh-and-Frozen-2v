import { firebase, db } from "Fire";
import { toast } from "react-toastify";
import { checkOutMercadoPago } from "./mercadopago";

export async function setBuyOrderFire(
  order,
  setCart,
  emptyStorage,
  setLoading
) {
  console.log(order);
  let ok = await updateStock(order.cart);
  if (ok) {
    db.collection("orders")
      .doc()
      .set(order)
      .then(() => {
        if (order.mercadoPago) {
          comprarMercadopago(
            order.cart,
            order.comprador,
            setCart,
            emptyStorage
          );
        } else {
          setCart([]);
          emptyStorage();
          toast.success("Compra exitosa!");
          if (setLoading) {
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Error en la base de datos. Intente mas tarde.");
      });
  } else {
    toast.error("No hay stock del producto.");
    setCart([]);
    setLoading(false);
    emptyStorage();
  }
}

async function updateStock(items) {
  const itemsRef = db.collection("items").where(
    firebase.firestore.FieldPath.documentId(),
    "in",
    items.map((i) => i.id)
  );
  let query = [];
  let everythingIsOK = true;
  let itemDocs = [];

  try {
    query = await itemsRef.get();
    let { docs } = query;
    itemDocs = docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
  } catch (err) {
    console.log(err);
  }

  itemDocs.forEach((item) => {
    items.forEach((item2) => {
      if (item.id === item2.id) {
        if (item.stock >= item2.cantidad) {
          item.stock = item.stock - item2.cantidad;
        } else {
          everythingIsOK = false;
        }
      }
    });
  });

  if (everythingIsOK) {
    const batch = db.batch();
    await query.docs.forEach((doc, i) => {
      batch.update(doc.ref, {
        stock: itemDocs[i].stock,
      });
    });
    batch.commit();
  }
  return everythingIsOK;
}

async function comprarMercadopago(cart, id, setCart, emptyStorage) {
  const items = cart.map((item) => {
    return {
      title: item.nombre,
      unit_price: Number.parseInt(item.precio * item.cantidad),
      quantity: 1,
      currency_id: "ARS",
    };
  });

  db.collection("orders")
    .where("comprador", "==", id)
    .orderBy("date", "desc")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id };
      });
    })
    .then((res) => {
      setCart([]);
      emptyStorage();
      checkOutMercadoPago(items, res[0].id);
    });
}

export function getOrders(id, setOrders, setLoading) {
  setLoading(true);
  db.collection("orders")
    .where("comprador", "==", id)
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setOrders(res);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function getLastOrder(id, setOrder) {
  db.collection("orders")
    .where("comprador", "==", id)
    .orderBy("date", "desc")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setOrder(res[0]);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function updateMPStatus(order, payment_id, setReloadOrders) {
  const url = `https://api.mercadopago.com/v1/payments/${payment_id}`;
  const auth = "Bearer " + process.env.REACT_APP_ACCESS_TOKEN;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  };

  fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === "approved") {
        db.collection("orders")
          .doc(order.id)
          .update({ paymentStatus: "Acreditado" })
          .then(() => {
            setReloadOrders(true);
          });
      } else if (data.status === "rejected" || data.status === "cancelled") {
        cancelOrder(order, setReloadOrders, true);
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Hubó un error buscando el pago. Intenté mas tarde.");
    });
}

export function getDailyOrders(day, setOrders) {
  db.collection("orders")
    .where("deliveryDay", "==", day)
    .where("entregado", "==", false)
    .where("onTheWay", "==", false)
    .where("cancelada", "==", false)
    .orderBy("date", "asc")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setOrders(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function getOnTheWayOrders(day, setOntheWayOrders) {
  db.collection("orders")
    .where("deliveryDay", "==", day)
    .where("onTheWay", "==", true)
    .orderBy("date", "asc")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setOntheWayOrders(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function getDeliveredOrders(day, setOntheWayOrders) {
  db.collection("orders")
    .where("deliveryDay", "==", day)
    .where("entregado", "==", true)
    .orderBy("date", "asc")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setOntheWayOrders(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function getCanceledOrders(day, setOrders) {
  db.collection("orders")
    .where("deliveryDay", "==", day)
    .where("cancelada", "==", true)
    .orderBy("date", "asc")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setOrders(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function onTheWayOrder(order, setReloadOrders) {
  db.collection("orders")
    .doc(order.id)
    .set({ ...order, onTheWay: true, cancelada: false })
    .then(() => {
      toast.success("Orden actualizada.");
      setReloadOrders(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function deliveredOrder(order, setReloadOrders) {
  db.collection("orders")
    .doc(order.id)
    .set({ ...order, onTheWay: false, entregado: true, cancelada: false })
    .then(() => {
      toast.success("Orden actualizada.");
      setReloadOrders(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

async function returnStock(items) {
  const itemsRef = db.collection("items").where(
    firebase.firestore.FieldPath.documentId(),
    "in",
    items.map((i) => i.id)
  );
  let query = [];
  let itemDocs = [];

  try {
    query = await itemsRef.get();
    let { docs } = query;
    itemDocs = docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
  } catch (err) {
    console.log(err);
  }

  itemDocs.forEach((item) => {
    items.forEach((item2) => {
      if (item.id === item2.id) {
        item.stock = item.stock + item2.cantidad;
      }
    });
  });

  const batch = db.batch();
  await query.docs.forEach((doc, i) => {
    batch.update(doc.ref, {
      stock: itemDocs[i].stock,
    });
  });
  batch.commit();
}

export async function cancelOrder(order, setReloadOrders, usoExterno) {
  await returnStock(order.cart);

  db.collection("orders")
    .doc(order.id)
    .set({ ...order, cancelada: true, onTheWay: false, entregado: false })
    .then(() => {
      setReloadOrders(true);
      if (!usoExterno) {
        toast.success("Orden cancelada.");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function deleteOrder(order, setReload) {
  db.collection("orders")
    .doc(order.id)
    .delete()
    .then(() => {
      toast.success("Orden eliminada");
      setReload(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

export function updateOrder(order) {}
