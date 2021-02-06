import { basepath } from "API/config";

export function signUpAPI(data) {
  const url = `${basepath}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function loginAPI(data) {
  const url = `${basepath}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return { ok: false, err };
    });
}
