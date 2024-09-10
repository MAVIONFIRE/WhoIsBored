import React from 'react';
import './css/SideMenu.css';

const SideMenu = ({ menuOpen, toggleMenu, handleMenuItemClick, handleLogout }) => {
  return (
    <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
      <div className="menu-toggle-container">
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <nav>
        <ul>
          <li><button onClick={() => handleMenuItemClick('welcome')}>Home</button></li>
          <li><button onClick={() => handleMenuItemClick('hobbies')}>Hobbies</button></li>
          <li><button onClick={() => handleMenuItemClick('friends')}>Friends</button></li>
          <li><button onClick={() => handleMenuItemClick('nearYou')}>Near You</button></li>
          <li><button onClick={() => handleMenuItemClick('whatToDo')}>What to Do</button></li>
          <li><button onClick={() => { handleMenuItemClick('welcome'); handleLogout(); }}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;