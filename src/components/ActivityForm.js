import React, { useState } from 'react';
import './css/ActivityForm.css';

const ActivityForm = ({ isOpen, onClose, onSubmit, activityType }) => {
  const [time, setTime] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ time, energyLevel, activityType });
  };

  if (!isOpen) return null;

  return (
    <div className="activity-form-overlay">
      <div className="activity-form">
        <h2>Activity Preferences</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="time">How much time do you have?</label>
            <select id="time" value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">Select time</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="energyLevel">How's your energy level?</label>
            <select id="energyLevel" value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)} required>
              <option value="">Select energy level</option>
              <option value="tired">Tired</option>
              <option value="slightlyTired">Slightly tired</option>
              <option value="feelingFine">Feeling fine</option>
              <option value="wantToLeave">Want to leave the house</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit">Find Activity</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;