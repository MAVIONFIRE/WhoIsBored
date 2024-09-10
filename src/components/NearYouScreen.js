import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './css/NearYouScreen.css';

const NearYouScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

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

  return (
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
  );
};

export default NearYouScreen;