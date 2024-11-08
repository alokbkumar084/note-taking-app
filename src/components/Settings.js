import React from "react";

const Settings = ({ darkMode, setDarkMode }) => {
  return (
    <div className="p-4 w-[25%]">
      <div className="flex items-center">
        <label className="text-lg mr-2">Dark Mode</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="toggle toggle-accent cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Settings;
