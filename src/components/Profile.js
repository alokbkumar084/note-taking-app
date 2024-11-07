// src/components/Profile.js
import React from "react";

const Profile = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div>
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> johndoe@example.com
        </p>
      </div>
    </div>
  );
};

export default Profile;
