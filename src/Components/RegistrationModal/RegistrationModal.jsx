// Components/RegistrationModal/RegistrationModal.jsx

import React, { useState, useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { Input, Button, message } from 'antd';

function RegistrationModal({ isOpen, closeModal }) {
  const { registerUser } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      message.error('Invalid email format');
      return;
    }

    registerUser(username, password, email);
    message.success('Registration successful!');
    closeModal();
  };


  return isOpen ? (
    <div className="login-modal">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button type="default" onClick={closeModal}>
          Cancel
        </Button>
      </form>
    </div>
  ) : null;
}

export default RegistrationModal;
