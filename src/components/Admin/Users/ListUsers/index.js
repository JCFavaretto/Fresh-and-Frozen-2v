import React, { useEffect, useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";

import { getAvatarApi, changeUserStatus } from "API/user";
import { getAccessToken } from "API/auth";

import noAvatar from "assets/img/no-avatar.png";
import Modal from "components/Modal";
import EditUserForm from "components/Admin/EditUserForm";

import "components/Admin/Users/ListUsers/ListUsers.scss";
import { toast } from "react-toastify";

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
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((res) => {
        setAvatar(res);
      });
    }
  }, [user]);

  function desactivateUser(user) {
    const token = getAccessToken();
    changeUserStatus(token, false, user._id)
      .then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success("Usuario desactivado");
        }
      })
      .finally(() => {
        setReloadUsers(true);
      });
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

  function activateUser(user) {
    const token = getAccessToken();
    changeUserStatus(token, true, user._id)
      .then((res) => {
        if (!res.ok) {
          toast.error(res.message);
        } else {
          toast.success("Usuario activado");
        }
      })
      .finally(() => {
        setReloadUsers(true);
      });
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activateUser(user)}>
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
