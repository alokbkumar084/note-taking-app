// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoteList from "./components/NoteList";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Effect to toggle dark mode class on body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="dark:bg-gray-800 dark:text-white">
        <Header />
        <div className="container mx-auto p-4">
          <div className="flex items-start flex-wrap">
            <Settings darkMode={darkMode} setDarkMode={setDarkMode} />

            <Routes>
              <Route path="/" element={<NoteList />} />

              <Route
                path="/settings"
                element={
                  <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
