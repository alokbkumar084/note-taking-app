import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoteList from "./components/NoteList";
import Settings from "./components/Settings";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="h-screen flex flex-col dark:bg-gray-800 dark:text-white">
        <Header />
        <div className="flex-grow container mx-auto p-4 pb-0">
          <div className="flex items-start flex-wrap">
            <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route path="/" element={<NoteList />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
