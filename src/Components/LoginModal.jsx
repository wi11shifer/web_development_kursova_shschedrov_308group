import React, { useState, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from '../LoginModal.module.css';
import { AppContext } from '../Contexts/AppContext';

function LoginModal({ isOpen, closeModal }) {
  const { loginUser } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username);
    closeModal();
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.modalEnter,
        enterActive: styles.modalEnterActive,
        exit: styles.modalExit,
        exitActive: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
              placeholder='Username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              <input
              placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
}

export default LoginModal;
