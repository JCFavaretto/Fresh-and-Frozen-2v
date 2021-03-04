import { db } from "Fire";
import { toast } from "react-toastify";

export async function setBuyOrderFire(order, setCart, emptyStorage) {
  await updateStock(order.cart);
  db.collection("orders")
    .doc()
    .set({ order })
    .then(() => {
      toast.success("Compra exitosa!");
      setCart([]);
      emptyStorage();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intente mas tarde.");
    });
}

async function updateStock(items) {
  const itemsRef = db.collection("items");

  items.map(async (item) => {
    return itemsRef
      .doc(item.id)
      .update({ stock: item.stock - item.cantidad })
      .catch((err) => {
        console.log(err);
        toast.error("Problema al actualizar el stock");
      });
  });
}
