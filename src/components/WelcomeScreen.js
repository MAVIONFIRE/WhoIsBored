import React from 'react';
import './css/WelcomeScreen.css';

const WelcomeScreen = ({ user, onFindActivity }) => {
  return (
    <div className="welcome-screen">
      <h2>Welcome, {user.name}!</h2>
      <p>We're glad to see you here.</p>
      <div className="activity-buttons">
        <button className="find-activity-btn" onClick={() => onFindActivity('alone')}>
          Find Something to Do Alone
        </button>
        <button className="find-activity-btn" onClick={() => onFindActivity('withSomeone')}>
          Find Something to Do with Someone
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;