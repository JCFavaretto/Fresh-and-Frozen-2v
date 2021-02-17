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

export function getUsersApi(token) {
  const url = `${basepath}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
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
      return err;
    });
}

export function getUsersActiveApi(token, status) {
  const url = `${basepath}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
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
      return err;
    });
}

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basepath}/upload/usuarios/${userId}`;

  const formData = new FormData();
  formData.append("archivo", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      authorization: token,
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
      console.log(err);
      return err;
    });
}

export function getAvatarApi(avatarName) {
  const url = `${basepath}/imagen/usuarios/${avatarName}`;

  return fetch(url)
    .then((res) => {
      return res.url;
    })
    .catch((err) => {
      return err;
    });
}

export function updateUserApi(token, user, userId) {
  const url = `${basepath}/update-user/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      authorization: token,

      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function changeUserStatus(token, active, userId) {
  const url = `${basepath}/change-status-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ active }),
  };

  return fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteUser(token, userId) {
  const url = `${basepath}/delete-user/${userId}`;
  const params = {
    method: "DELETE",
    headers: {
      authorization: token,
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
      return err;
    });
}
