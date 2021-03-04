import { storage, db } from "Fire";
import { toast } from "react-toastify";

export function getProductsActiveFire(estado, setProductos) {
  db.collection("items")
    .where("active", "==", estado)
    .get()
    .then((querySnapshot) => {
      if (estado && querySnapshot.size === 0) {
        toast.error("No se encontraron productos.");
      }
      let itemCollection = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return itemCollection;
    })
    .then((res) => {
      setProductos(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Se produjo un error al cargar los productos.");
    });
}

export function changeProductStatusFire(status, item, setReloadProducts) {
  db.collection("items")
    .doc(item.id)
    .update({ ...item, active: status })
    .then(() => {
      toast.success("Producto actualizado.");
      setReloadProducts(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Problema actualizando el producto. Intente mas tarde.");
    });
}

export function borrarProductoApiFire(name, id, setReloadProducts) {
  storage
    .ref()
    .child(`images/${name}`)
    .delete()
    .then(() => {
      db.collection("items")
        .doc(id)
        .delete()
        .then(() => {
          toast.success("Producto eliminado.");
          setReloadProducts(true);
        });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Problema al eliminar el producto. Intente mas tarde.");
    });
}

export function getProductsFire(setProductos) {
  db.collection("items")
    .where("active", "==", true)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        toast.warn(
          "Los productos no se cargaron correctamente. Recargue la pagina."
        );
      }
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setProductos(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error(
        "Los productos no se cargaron correctamente. Recargue la pagina."
      );
    });
}

export function getOnSaleProductsFire(setProductos) {
  db.collection("items")
    .where("active", "==", true)
    .where("onSale", "==", true)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        toast.warn(
          "Los productos no se cargaron correctamente. Recargue la pagina."
        );
      }
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setProductos(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error(
        "Los productos no se cargaron correctamente. Recargue la pagina."
      );
    });
}

export function getCategoryProductsFire(category, setProductos) {
  db.collection("items")
    .where("active", "==", true)
    .where("cat", "==", category)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        toast.warn(
          "Los productos no se cargaron correctamente. Recargue la pagina."
        );
      }
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setProductos(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error(
        "Los productos no se cargaron correctamente. Recargue la pagina."
      );
    });
}

export function uploadImgProductFire(
  data,
  img,
  setImg,
  setReloadProducts,
  setProductData,
  initialState,
  setModalVisible
) {
  const uploadTask = storage.ref(`images/${data.nombre}`).put(img);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(data.nombre)
        .getDownloadURL()
        .then((url) => {
          data.img = url;
          setProductFire(
            data,
            setImg,
            setReloadProducts,
            setProductData,
            initialState,
            setModalVisible
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "No se actualizo la imagen correctamente. Intente mas tarde."
          );
        });
    }
  );
}

export function updateImgProductFire(data, img, setModal, setReload) {
  const uploadTask = storage.ref(`images/${data.nombre}`).put(img);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(data.nombre)
        .getDownloadURL()
        .then((url) => {
          data.img = url;
          updateProductFire(data, setModal, setReload);
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "No se actualizo la imagen correctamente. Intente mas tarde."
          );
        });
    }
  );
}

export function updateProductFire(data, setModal, setReload) {
  db.collection("items")
    .doc(data.id)
    .update(data)
    .then(() => {
      toast.success("Producto actualizado correctamente.");
      setModal(false);
      setReload(true);
    })
    .catch((err) => {
      toast.error("Problema actualizando el producto. Intente mas tarde.");
    });
}

function setProductFire(
  data,
  setImg,
  setReloadProducts,
  setProductData,
  initialState,
  setModalVisible
) {
  db.collection("items")
    .doc()
    .set(data)
    .then(() => {
      toast.success("Producto guardado.");

      setImg(null);
      setReloadProducts(true);
      setProductData(initialState);
      setModalVisible(false);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error guardando el producto. Intente mas tarde.");
    });
}
