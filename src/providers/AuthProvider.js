import React, { useState, useEffect, createContext } from "react";
import {
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  logout,
} from "API/auth";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    checkUserLogin(setUser, setRefresh);
    if (refresh === true) {
      setRefresh(false);
    }
  }, [refresh]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser, setRefresh) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logout();
      setUser({ user: null, isLoading: false });
    } else {
      refreshAccessToken(refreshToken);
      setRefresh(true);
    }
  } else {
    setUser({ isLoading: false, user: jwtDecode(accessToken) });
  }
}
