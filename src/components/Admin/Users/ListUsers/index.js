import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import noAvatar from "assets/img/no-avatar.png";
import Modal from "components/Modal";

import "components/Admin/Users/ListUsers/ListUsers.scss";
import EditUserForm from "components/Admin/EditUserForm";

function ListUsers({ usersActive, usersInactive }) {
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

function UsersActive({ users, setEdit, setModalTitle, setModalContent }) {
  function activeModal(data) {
    setModalTitle(`Editar usuario: ${data.name}`);
    setModalContent(<EditUserForm user={data} />);
    setEdit(true);
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => activeModal(user)}>
              <EditOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactiver Usuario")}
            >
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
            avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />}
            title={`${user.name} ${user.lastName}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function UsersInactive({ users }) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("activar Usuario")}
            >
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
            avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />}
            title={`${user.name} ${user.lastName}`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

export default ListUsers;
