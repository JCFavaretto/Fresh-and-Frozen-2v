import React, { useState } from "react";
import { Switch, List, Button } from "antd";
import {
  CheckOutlined,
  EditOutlined,
  StopOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { changeUserStatusFire } from "Fire/user";

import Modal from "components/Modal";
import EditUserForm from "components/Admin/EditUserForm";

import "components/Admin/ListUsers/ListUsers.scss";
import RegisterForm from "components/RegisterForm";

function ListUsers({ usersActive, usersInactive, setReloadUsers }) {
  const [active, setActive] = useState(true);
  const [edit, setEdit] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  function addUserModal() {
    setEdit(true);
    setModalTitle("Crear nuevo usuario");
    setModalContent(<RegisterForm setReloadUsers={setReloadUsers} />);
  }

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => {
              setActive((prev) => !prev);
            }}
          />
          {active ? "Usuarios Activos" : "Usuarios Inactivos"}
        </div>

        <Button type="primary" onClick={addUserModal}>
          <UserAddOutlined style={{ fontSize: "1.1rem" }} />
        </Button>
      </div>

      {active ? (
        <UsersActive
          users={usersActive}
          setEdit={setEdit}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive users={usersInactive} setReloadUsers={setReloadUsers} />
      )}
      <Modal title={modalTitle} isVisible={edit} setIsVisible={setEdit}>
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive({
  users,
  setEdit,
  setModalTitle,
  setModalContent,
  setReloadUsers,
}) {
  function activeModal(data) {
    setModalTitle(`Editar usuario: ${data.name}`);
    setModalContent(
      <EditUserForm
        user={data}
        setEdit={setEdit}
        setReloadUsers={setReloadUsers}
      />
    );
    setEdit(true);
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <UserActive
          user={user}
          activeModal={activeModal}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive({ user, activeModal, setReloadUsers }) {
  function desactivateUser(user) {
    changeUserStatusFire(false, user, setReloadUsers);
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activeModal(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => desactivateUser(user)}>
          <StopOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`${user.name} ${user.lastName}`}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive({ users, setReloadUsers }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive({ user, setReloadUsers }) {
  function activateUser(user) {
    changeUserStatusFire(true, user, setReloadUsers);
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activateUser(user)}>
          <CheckOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`${user.name} ${user.lastName}`}
        description={user.email}
      />
    </List.Item>
  );
}

export default ListUsers;
