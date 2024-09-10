import React from 'react';
import './css/WhatToDoScreen.css';

const WhatToDoScreen = ({ activityPreferences }) => {
  if (!activityPreferences) {
    return <div className="what-to-do-screen">Please select your activity preferences first.</div>;
  }

  const { time, energyLevel, activityType } = activityPreferences;

  return (
    <div className="what-to-do-screen">
      <h2>What To Do</h2>
      <div className="preferences-summary">
        <h3>Your Preferences:</h3>
        <p>Time available: {time} minutes</p>
        <p>Energy level: {energyLevel}</p>
        <p>Activity type: {activityType === 'alone' ? 'Alone' : 'With Someone'}</p>
      </div>
      {/* Add activity suggestions here in the future */}
    </div>
  );
};

export default WhatToDoScreen;