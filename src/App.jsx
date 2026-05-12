import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import About from "./pages/About";

function App() {
  const [weatherMood, setWeatherMood] = useState(
    localStorage.getItem("weatherMood") || "",
  );
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  function updateWeatherMood(mood) {
    setWeatherMood(mood);
    localStorage.setItem("weatherMood", mood);
  }

  function toggleTheme() {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem("theme", nextTheme ? "dark" : "light");
      return nextTheme;
    });
  }

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <main className={`app ${isDarkMode ? "dark" : ""} ${weatherMood}`}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              updateWeatherMood={updateWeatherMood}
            />
          }
        />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default App;
