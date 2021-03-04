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
              toast.error("No se inicio sesión correctamente.");
            }
            setUser({ user: { uid, ...doc.data() }, isLoading: false });
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
