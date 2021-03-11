import { db } from "Fire";
import { toast } from "react-toastify";

export function addNewPostFire(
  post,
  setReloadPost,
  setVisible,
  setLoading,
  setPostData
) {
  db.collection("blog")
    .doc()
    .set(post)
    .then(() => {
      toast.success("Post creado.");
      setReloadPost(true);
      setVisible(false);
      setLoading(false);
      setPostData({});
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intenté mas tarde.");
      setLoading(false);
    });
}

export function getPostsFire(setPost) {
  db.collection("blog")
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setPost(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error al cargar los posteos. Intenté mas tarde.");
    });
}

export function deletePostFire(id, setReload) {
  db.collection("blog")
    .doc(id)
    .delete()
    .then(() => {
      toast.success("Post eliminado.");
      setReload(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error("No se pudo eliminar el post. Intenté mas tarde.");
    });
}

export function updatePostFire(post, setReloadPost, setVisible, setLoading) {
  db.collection("blog")
    .doc(post.id)
    .update(post)
    .then(() => {
      toast.success("Post actualizado.");
      setReloadPost(true);
      setVisible(false);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error actualizando el post. Intente mas tarde.");
      setLoading(false);
    });
}
