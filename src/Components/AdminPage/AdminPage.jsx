// Components/AdminPage/AdminPage.jsx

import React, { useContext, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { List, Input, Select, Button, Form } from 'antd';

const { Option } = Select;

const AdminPage = () => {
  const { user, roles, users, updateUserRole, deleteUser, registerUser } = useContext(AppContext);

  if (user?.role !== roles.admin) {
    return <p>Access denied: Admins only</p>;
  }

  const [editedUsers, setEditedUsers] = useState(users);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: roles.user });
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const handleInputChange = (username, field, value) => {
    setEditedUsers((prev) =>
      prev.map((u) =>
        u.username === username ? { ...u, [field]: value } : u
      )
    );
  };

  const togglePasswordVisibility = (username) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };


  const saveChanges = () => {
    editedUsers.forEach((editedUser) => {
      const originalUser = users.find((u) => u.username === editedUser.username);
      if (originalUser) {
        if (originalUser.role !== editedUser.role) {
          updateUserRole(editedUser.username, editedUser.role);
        }
        Object.assign(originalUser, editedUser);
      }
    });
  };

  const handleDeleteUser = (username) => {
    deleteUser(username);
    setEditedUsers(editedUsers.filter((user) => user.username !== username));
  };

  const handleAddUser = () => {
    if (newUser.username && newUser.password && newUser.email) {
      registerUser(newUser.username, newUser.password, newUser.email, newUser.role);
      setEditedUsers([...editedUsers, newUser]);
      setNewUser({ username: '', email: '', password: '', role: roles.user });
    }
  };

  return (
    <div className="admin-page-container">
      <h1>Admin Dashboard</h1>
      <List
        bordered
        dataSource={editedUsers}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="danger" onClick={() => handleDeleteUser(item.username)}>
                Delete
              </Button>,
            ]}
          >
            <Input
              placeholder="Username"
              value={item.username}
              onChange={(e) => handleInputChange(item.username, 'username', e.target.value)}
              style={{ width: '150px', marginRight: '10px' }}
            />
            <Input
              placeholder="Email"
              value={item.email}
              onChange={(e) => handleInputChange(item.username, 'email', e.target.value)}
              style={{ width: '200px', marginRight: '10px' }}
              type="email"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              <Input
                placeholder="Password"
                value={item.password}
                onChange={(e) => handleInputChange(item.username, 'password', e.target.value)}
                type={visiblePasswords[item.username] ? 'text' : 'password'}
                style={{ flex: 1 }}
              />
              <Button onClick={() => togglePasswordVisibility(item.username)}>
                {visiblePasswords[item.username] ? 'Hide' : 'Show'}
              </Button>
            </div>

            <Select
              value={item.role}
              onChange={(newRole) => handleInputChange(item.username, 'role', newRole)}
              style={{ width: '120px' }}
            >
              <Option value={roles.user}>User</Option>
              <Option value={roles.editor}>Editor</Option>
              <Option value={roles.admin}>Admin</Option>
            </Select>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={saveChanges} style={{ marginTop: '20px' }}>
        Save Changes
      </Button>

      <h2 style={{ marginTop: '30px' }}>Add New User</h2>
      <Form layout="inline">
        <Form.Item>
          <Input
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            type="email"
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            type="password"
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={newUser.role}
            onChange={(role) => setNewUser({ ...newUser, role })}
          >
            <Option value={roles.user}>User</Option>
            <Option value={roles.editor}>Editor</Option>
            <Option value={roles.admin}>Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminPage;
