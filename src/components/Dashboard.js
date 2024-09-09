import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({ name: 'John Doe', ...userData });
      setHobbies(userData.hobbies || []);
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
  };

  const handleAddHobby = (e) => {
    e.preventDefault();
    if (newHobby.trim()) {
      const updatedHobbies = [...hobbies, newHobby.trim()];
      setHobbies(updatedHobbies);
      setNewHobby('');
      
      const userData = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({ ...userData, hobbies: updatedHobbies }));
    }
  };

  const handleRemoveHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
    
    const userData = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...userData, hobbies: updatedHobbies }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setShowMap(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please check your browser settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  if (!user) return null;

  return (
    <div className={`dashboard ${menuOpen ? 'menu-open' : ''}`}>
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
            <li><button onClick={() => handleMenuItemClick('nearYou')}>Near You</button></li>
            <li><button onClick={() => { handleMenuItemClick('welcome'); handleLogout(); }}>Logout</button></li>
          </ul>
        </nav>
      </div>
      <main className={`dashboard-content ${menuOpen ? 'shifted' : ''}`}>
        {currentScreen === 'welcome' && (
          <div className="welcome-screen">
            <h2>Welcome, {user.name}!</h2>
            <p>We're glad to see you here.</p>
          </div>
        )}
        {currentScreen === 'hobbies' && (
          <div className="hobbies-screen">
            <h2>Your Hobbies</h2>
            <ul className="hobbies-list">
              {hobbies.map((hobby, index) => (
                <li key={index}>
                  {hobby}
                  <button onClick={() => handleRemoveHobby(index)} className="remove-hobby">×</button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddHobby} className="add-hobby-form">
              <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Enter a new hobby"
              />
              <button type="submit">Add Hobby</button>
            </form>
          </div>
        )}
        {currentScreen === 'nearYou' && (
          <div className="near-you-screen">
            <h2>Near You</h2>
            {!showMap ? (
              <button onClick={handleGetLocation} className="get-location-btn">
                Can we see where you are?
              </button>
            ) : (
              <LoadScript googleMapsApiKey="GOOGLEAPIKEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={userLocation}
                  zoom={14}
                >
                  <Marker position={userLocation} />
                </GoogleMap>
              </LoadScript>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;