import React, { useEffect, useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";

import { getAvatarApi } from "API/user";

import noAvatar from "assets/img/no-avatar.png";
import Modal from "components/Modal";
import EditUserForm from "components/Admin/EditUserForm";

import "components/Admin/Users/ListUsers/ListUsers.scss";

function ListUsers({ usersActive, usersInactive, setReloadUsers }) {
  const [active, setActive] = useState(true);
  const [edit, setEdit] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => {
            setActive((prev) => !prev);
          }}
        />
        {active ? "Usuarios Activos" : "Usuarios Inactivos"}
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
        <UsersInactive users={usersInactive} />
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
        <UserActive user={user} activeModal={activeModal} />
      )}
    />
  );
}

function UserActive({ user, activeModal }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((res) => {
        setAvatar(res);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activeModal(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("Desactiver Usuario")}>
          <StopOutlined />
        </Button>,
        <Button
          type="danger"
          onClick={() => {
            console.log("Eliminar");
          }}
        >
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : noAvatar} />}
        title={`${user.name} ${user.lastName}`}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive({ users }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => <UserInactive user={user} />}
    />
  );
}

function UserInactive({ user }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((res) => {
        setAvatar(res);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("activar Usuario")}>
          <CheckOutlined />
        </Button>,
        <Button
          type="danger"
          onClick={() => {
            console.log("Eliminar");
          }}
        >
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : noAvatar} />}
        title={`${user.name} ${user.lastName}`}
        description={user.email}
      />
    </List.Item>
  );
}

export default ListUsers;
