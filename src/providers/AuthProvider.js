import React, { useState, useEffect, createContext } from "react";
import { db, auth } from "Fire";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const { uid } = authUser;
        const userCollection = db.collection("users");
        const data = userCollection.doc(uid);
        data
          .get()
          .then((doc) => {
            if (!doc.exists) {
              if (authUser.providerData[0].providerId === "google.com") {
                let dname = authUser.providerData[0].displayName.split(" ");
                let apellido = dname[dname.length - 1];
                dname.pop();
                db.collection("users")
                  .doc(uid)
                  .set({
                    name: dname.join(" "),
                    lastName: apellido,
                    email: authUser.providerData[0].email,
                    date: new Date(),
                    role: "USER_ROLE",
                    active: true,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              } else toast.error("No se inicio sesión correctamente.");
            }
            if (doc.data().active === false) {
              auth.signOut();
            } else setUser({ user: { uid, ...doc.data() }, isLoading: false });
          })
          .catch((err) => {
            console.log(err);
            toast.error(
              "Hubo un problema al iniciar sesion. Intente mas tarde."
            );
          });
      } else {
        setUser({ user: null, isLoading: false });
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
