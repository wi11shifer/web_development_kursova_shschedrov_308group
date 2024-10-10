import React from 'react';
import LoginModal from './LoginModal';
export default function Menu({ isLoggedIn }) {
  return (
    <div className="Menu">
      <h1>Here you can buy some books!</h1>
      {isLoggedIn ? (
        <p>Welcome back! Feel free to browse our books.</p>
      ) : (
        <p>Please login to make a purchase.</p>
      )}
    </div>
  );
}
