import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAccessToken } from "API/auth";
import { getUsersActiveApi } from "API/user";

import ListUsers from "components/Admin/ListUsers";

import "pages/Admin/User/User.scss";

function User() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessToken();

  useEffect(() => {
    getUsersActiveApi(token, true).then((res) => {
      if (res.ok) {
        setUsersActive(res.users);
      } else {
        toast.error(res.message);
      }
    });
    getUsersActiveApi(token, false).then((res) => {
      if (res.ok) {
        setUsersInactive(res.users);
      } else {
        toast.error(res.message);
      }
    });

    setReloadUsers(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadUsers]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}

export default User;
