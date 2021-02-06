import { basepath } from "API/config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === null) {
    return false;
  }
  return willExpireToken(accessToken) ? false : accessToken;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === null) {
    return false;
  }
  return willExpireToken(refreshToken) ? false : refreshToken;
}

export function refreshAccessToken(refreshToken) {
  const url = `${basepath}/refresh-access-token`;
  const bodyObj = {
    refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }
      return res.json();
    })
    .then((result) => {
      if (!result) {
        // LogOut
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
