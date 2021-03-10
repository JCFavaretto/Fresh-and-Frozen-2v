import { db } from "Fire";
import { toast } from "react-toastify";

export function addNewPost(post, setReloadPost, setVisible, setLoading) {
  db.collection("blog")
    .doc()
    .set(post)
    .then(() => {
      setReloadPost(true);
      setVisible(false);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error en la base de datos. Intenté mas tarde.");
      setLoading(false);
    });
}
