import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import WelcomeScreen from './WelcomeScreen';
import HobbiesScreen from './HobbiesScreen';
import NearYouScreen from './NearYouScreen';
import FriendsScreen from './FriendsScreen';
import WhatToDoScreen from './WhatToDoScreen';
import ActivityForm from './ActivityForm';
import './css/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [showNoHobbiesMessage, setShowNoHobbiesMessage] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityType, setActivityType] = useState(null);
  const [activityPreferences, setActivityPreferences] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({ name: 'John Doe', ...userData });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (screen) => {
    setCurrentScreen(screen);
    setMenuOpen(false);
    setShowNoHobbiesMessage(false);
  };

  const handleFindActivity = (type) => {
    setActivityType(type);
    setShowActivityForm(true);
  };

  const handleActivityFormSubmit = (preferences) => {
    setActivityPreferences(preferences);
    setShowActivityForm(false);
    setCurrentScreen('whatToDo');
  };

  const hasHobbies = user?.selectedHobbies && Object.values(user.selectedHobbies).some(arr => arr.length > 0);

  if (!user) return null;

  return (
    <div className={`dashboard ${menuOpen ? 'menu-open' : ''}`}>
      <SideMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleMenuItemClick={handleMenuItemClick}
        handleLogout={handleLogout}
      />
      <main className={`dashboard-content ${menuOpen ? 'shifted' : ''}`}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            user={user} 
            onFindActivity={handleFindActivity}
          />
        )}
        {currentScreen === 'hobbies' && (
          <HobbiesScreen 
            showNoHobbiesMessage={showNoHobbiesMessage} 
            setShowNoHobbiesMessage={setShowNoHobbiesMessage}
            setUser={setUser}
          />
        )}
        {currentScreen === 'friends' && <FriendsScreen user={user} />}
        {currentScreen === 'nearYou' && <NearYouScreen />}
        {currentScreen === 'whatToDo' && <WhatToDoScreen activityPreferences={activityPreferences} />}
      </main>
      <ActivityForm
        isOpen={showActivityForm}
        onClose={() => setShowActivityForm(false)}
        onSubmit={handleActivityFormSubmit}
        activityType={activityType}
      />
    </div>
  );
};

export default Dashboard;