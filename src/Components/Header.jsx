import React, { useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { useStatus } from '../hooks/useStatus';
import LoginModal from './LoginModal';
import { CSSTransition } from 'react-transition-group';
import styles from '../LoginModal.module.css';
import StyledButton from '../StyledComponents/StyledButton';
import StyledTitle from '../StyledComponents/StyledTitle';

function Header() {
  const { isLoggedIn, user, logoutUser } = useContext(AppContext);
  const { status: isModalOpen, toggleStatus: toggleModal } = useStatus(false);

  return (
    <header className="header">
      <StyledTitle>Bookstore</StyledTitle>
      {isLoggedIn ? (
        <>
          <p>Welcome, {user}!</p>
          <StyledButton onClick={logoutUser}>Logout</StyledButton>
        </>
      ) : (
        <>
          <p>Please, log in</p>
          <StyledButton onClick={() => toggleModal(true)}>Login</StyledButton>
        </>
      )}

      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
        unmountOnExit
      >
        <LoginModal isOpen={isModalOpen} closeModal={() => toggleModal(false)} />
      </CSSTransition>
    </header>
  );
}

export default Header;
