import { firebase, db } from "Fire";
import { toast } from "react-toastify";

export async function setBuyOrderFire(
  order,
  setCart,
  emptyStorage,
  setLoading
) {
  let ok = await updateStock(order.cart);
  if (ok) {
    db.collection("orders")
      .doc()
      .set(order)
      .then(() => {
        toast.success("Compra exitosa!");
        setCart([]);
        emptyStorage();
        setLoading(false);
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

export function cancelOrder(order, setReloadOrders) {
  db.collection("orders")
    .doc(order.id)
    .set({ ...order, cancelada: true, onTheWay: false, entregado: false })
    .then(() => {
      toast.success("Orden cancelada.");
      setReloadOrders(true);
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
