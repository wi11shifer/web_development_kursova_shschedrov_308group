// Components/LoginModal/LoginModal.jsx

import React, { useState, useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { Input, Button, Checkbox, message } from 'antd';

function LoginModal({ isOpen, closeModal }) {
  const { loginUser, rememberUser } = useContext(AppContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser(usernameOrEmail, password, rememberMe)) {
      message.success('Login successful!');
      closeModal();
    } else {
      message.error('Invalid username/email or password');
    }
  };

  return isOpen ? (
    <div className="login-modal">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Checkbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        >
          Remember Me
        </Checkbox>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="default" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  ) : null;
}

export default LoginModal;
