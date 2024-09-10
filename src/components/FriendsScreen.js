import React from 'react';
import './css/FriendsScreen.css';

const FriendsScreen = ({ user }) => {
  // Hard-coded test friends (only bored friends are included)
  const boredFriends = [
    {
      name: "Alice",
      hobbies: ["Basketball", "Swimming", "Valorant"]
    },
    {
      name: "Charlie",
      hobbies: ["Soccer", "Apex Legends", "Go Bowling"]
    }
  ];

  const hasHobbies = user.selectedHobbies && Object.values(user.selectedHobbies).some(arr => arr.length > 0);

  const getSharedHobbies = (friend) => {
    if (!hasHobbies) return [];
    return Object.values(user.selectedHobbies)
      .flat()
      .filter(hobby => friend.hobbies.includes(hobby));
  };

  return (
    <div className="friends-screen">
      <h2>Bored Friends</h2>
      {!hasHobbies && (
        <p className="no-hobbies-message">You haven't selected any hobbies yet. Visit the Hobbies page to get started!</p>
      )}
      {boredFriends.map((friend, index) => (
        <div key={index} className="friend-card">
          <h3>{friend.name}</h3>
          <p>Shared Hobbies:</p>
          {hasHobbies ? (
            <ul>
              {getSharedHobbies(friend).map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          ) : (
            <p>Select hobbies to see what you have in common!</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendsScreen;