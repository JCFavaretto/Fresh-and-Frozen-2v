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

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
