// src/components/ProfileModal.js
import React from 'react';

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>User Profile</h2>
        <ul>
          <li><strong>First Name:</strong> {user.firstName}</li>
          <li><strong>Last Name:</strong> {user.lastName}</li>
          <li><strong>Date of Birth:</strong> {user.dob}</li>
          <li><strong>Age:</strong> {user.age}</li>
          <li><strong>Region:</strong> {user.region}</li>
          <li><strong>Language:</strong> {user.language}</li>
          <li><strong>Email:</strong> {user.email}</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
