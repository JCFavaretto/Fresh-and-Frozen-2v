import { firebase, db, auth } from "Fire";
import { toast } from "react-toastify";

export function signUpFire(data, setInputs, setReloadUsers) {
  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((cred) => {
      db.collection("users")
        .doc(cred.user.uid)
        .set({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          date: new Date(),
          role: "USER_ROLE",
          active: true,
        })
        .then(() => {
          toast.success("Usuario creado exitosamente.");
          setInputs({
            name: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
          });
          if (setReloadUsers) {
            setReloadUsers(true);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("No se ha creado el usuario.");
        });
    });
}

export function loginFire(data, location) {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      toast.success("Iniciando sesión.");
      if (location.pathname === "/admin/login") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("No se ha podido iniciar sesión.");
    });
}

export function getActiveUSersFire(status, setUsers) {
  db.collection("users")
    .where("active", "==", status)
    .get()
    .then((querySnapshot) => {
      if (status && querySnapshot.size === 0) {
        toast.warn(
          "No se encontraron usuarios activos. Puede ser un problema con el servidor. Intente mas tarde"
        );
      }
      return querySnapshot.docs.map((doc) => {
        return { uid: doc.id, ...doc.data() };
      });
    })
    .then((res) => {
      setUsers(res);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Hubo un problema al cargar usuarios. Intente mas tarde.");
    });
}

export function changeUserStatusFire(status, user, setReloadUsers) {
  db.collection("users")
    .doc(user.uid)
    .update({ ...user, active: status })
    .then(() => {
      toast.success("Usuario actualizado.");
      setReloadUsers(true);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Problema actualizando el usuario. Intente mas tarde.");
    });
}

export async function updateUserFire(
  data,
  user,
  setEdit,
  setReloadUsers,
  setLoading
) {
  try {
    if (data.password) {
      await auth.currentUser.updatePassword(data.password);
      delete data.password;
    }
    if (user.email !== data.email) {
      await auth.currentUser.updateEmail(data.email);
    }
    await db
      .collection("users")
      .doc(user.uid)
      .set({ ...user, ...data });

    toast.success("Usuario actualizado.");
    if (setEdit && setReloadUsers) {
      setEdit(false);
      setReloadUsers(true);
    }
    if (setLoading) {
      setLoading(false);
    }
  } catch (err) {
    console.log(err);
    toast.error("El usuario no se actualizo correctamente.");
    if (setLoading) {
      setLoading(false);
    }
  }
}

export function googleSignIn() {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      return user;
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function resetUserPass(email) {
  try {
    auth.sendPasswordResetEmail(email);
    window.location.href = "/login";
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
}
