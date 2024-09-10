import React, { useState, useEffect } from 'react';
import './css/HobbiesScreen.css';

const hobbyOptions = {
  sports: ['Basketball', 'Football', 'Soccer', 'Tennis', 'Volleyball', 'Swimming'],
  videoGames: ['Valorant', 'Apex Legends', 'CS:GO', 'League of Legends', 'Fortnite', 'Minecraft'],
  getOut: ['Get Food', 'Watch a Movie', 'Go Bowling', 'Visit a Museum', 'Go to a Concert', 'Take a Hike']
};

const HobbiesScreen = ({ showNoHobbiesMessage, setUser, setShowNoHobbiesMessage }) => {
  const [selectedCategory, setSelectedCategory] = useState('sports');
  const [selectedHobbies, setSelectedHobbies] = useState({
    sports: [],
    videoGames: [],
    getOut: []
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.selectedHobbies) {
      setSelectedHobbies(userData.selectedHobbies);
    }
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowNoHobbiesMessage(false); // Remove the red text when a category is clicked
  };

  const handleHobbyToggle = (hobby) => {
    setSelectedHobbies(prevSelected => {
      const updatedCategory = prevSelected[selectedCategory].includes(hobby)
        ? prevSelected[selectedCategory].filter(h => h !== hobby)
        : [...prevSelected[selectedCategory], hobby];

      const updatedHobbies = {
        ...prevSelected,
        [selectedCategory]: updatedCategory
      };

      const userData = JSON.parse(localStorage.getItem('user'));
      const updatedUserData = { ...userData, selectedHobbies: updatedHobbies };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      setUser(updatedUserData);

      return updatedHobbies;
    });
    setShowNoHobbiesMessage(false); // Remove the red text when a hobby is toggled
  };

  return (
    <div className="hobbies-screen">
      <h2>Your Hobbies</h2>
      {showNoHobbiesMessage && (
        <p className="no-hobbies-message">Please select hobbies first</p>
      )}
      <div className="hobbies-container">
        <div className="category-bar">
          {Object.keys(hobbyOptions).map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategorySelect(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="hobby-options">
          {hobbyOptions[selectedCategory].map(hobby => (
            <button
              key={hobby}
              className={`hobby-option ${selectedHobbies[selectedCategory].includes(hobby) ? 'selected' : ''}`}
              onClick={() => handleHobbyToggle(hobby)}
            >
              {hobby}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HobbiesScreen;