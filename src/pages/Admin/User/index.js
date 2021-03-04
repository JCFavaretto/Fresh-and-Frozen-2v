import React, { useEffect, useState } from "react";

import { getActiveUSersFire } from "Fire/user";

import ListUsers from "components/Admin/ListUsers";

import "pages/Admin/User/User.scss";

function User() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  useEffect(() => {
    getActiveUSersFire(true, setUsersActive);
    getActiveUSersFire(false, setUsersInactive);
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
