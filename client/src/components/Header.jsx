// src/components/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar">
      <div className="logo">HarmoniqMind</div>
      <nav>
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/profile" className="avatar-link">
          <img src="/assets/avatar.png" alt="Profile" className="avatar" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
