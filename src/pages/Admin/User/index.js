import React, { useEffect, useState } from "react";

import { getAccessToken } from "API/auth";
import { getUsersActiveApi } from "API/user";

import ListUsers from "components/Admin/Users/ListUsers";

import "pages/Admin/User/User.scss";

function User() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    getUsersActiveApi(token, true).then((res) => {
      if (res.ok) {
        setUsersActive(res.users);
      }
    });
    getUsersActiveApi(token, false).then((res) => {
      if (res.ok) {
        setUsersInactive(res.users);
      }
    });
  }, []); //eslint-disable-line

  return (
    <div className="users">
      <ListUsers usersActive={usersActive} usersInactive={usersInactive} />
    </div>
  );
}

export default User;
