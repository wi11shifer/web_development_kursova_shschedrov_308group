// Components/Header/Header.jsx

import React, { useContext, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useSelector } from 'react-redux';
import { useStatus } from '../../hooks/useStatus';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LoginModal from '.././LoginModal/LoginModal';
import RegistrationModal from '.././RegistrationModal/RegistrationModal';
import CartModal from '.././CartModal/CartModal';
import styles from '.././LoginModal/LoginModal.module.css';
import StyledButton from '../../StyledComponents/StyledButton';
import StyledTitle from '../../StyledComponents/StyledTitle';
import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header({ isDarkTheme }) {
  const { isLoggedIn, user, logoutUser } = useContext(AppContext);
  const { status: isLoginModalOpen, toggleStatus: toggleLoginModal } = useStatus(false);
  const { status: isRegistrationModalOpen, toggleStatus: toggleRegistrationModal } = useStatus(false);
  const { status: isCartModalOpen, toggleStatus: toggleCartModal } = useStatus(false);
  const selectedProducts = useSelector((state) => state.items.selectedItems || []);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.items.selectedItems || []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <header className="header">
      <div className="content">
        <StyledTitle>Bookstore</StyledTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isLoggedIn ? (
            <>
              <p>Welcome, {user.username}!</p>
              <StyledButton onClick={logoutUser}>Logout</StyledButton>
            </>
          ) : (
            <>
              <p>Please, log in or register</p>
              <StyledButton onClick={() => toggleLoginModal(true)} style={{ marginRight: '10px' }}>
                Login
              </StyledButton>
              <StyledButton
                type="primary"
                onClick={() => toggleRegistrationModal(true)}
                style={{ marginLeft: '10px' }}
              >
                Register
              </StyledButton>
            </>
          )}
          <Badge count={cartItems.length} style={{ marginLeft: '20px' }}>
            <Button
              icon={<ShoppingCartOutlined />}
              shape="circle"
              onClick={openCart}
            />
          </Badge>
        </div>
        <CartModal
          isOpen={isCartOpen}
          closeModal={closeCart}
          isDarkTheme={isDarkTheme}
        />
        <CSSTransition
          in={isLoginModalOpen}
          timeout={300}
          classNames={{
            enter: styles.modalEnter,
            enterActive: styles.modalEnterActive,
            exit: styles.modalExit,
            exitActive: styles.modalExitActive,
          }}
          unmountOnExit
        >
          <LoginModal isOpen={isLoginModalOpen} closeModal={() => toggleLoginModal(false)} />
        </CSSTransition>

        <CSSTransition
          in={isRegistrationModalOpen}
          timeout={300}
          classNames={{
            enter: styles.modalEnter,
            enterActive: styles.modalEnterActive,
            exit: styles.modalExit,
            exitActive: styles.modalExitActive,
          }}
          unmountOnExit
        >
          <RegistrationModal
            isOpen={isRegistrationModalOpen}
            closeModal={() => toggleRegistrationModal(false)}
          />
        </CSSTransition>

        <CartModal isOpen={isCartModalOpen} closeModal={() => toggleCartModal(false)} />
      </div>
    </header>
  );
}

export default Header;
