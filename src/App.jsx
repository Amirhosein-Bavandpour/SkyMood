import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { translations } from "./i18n/translations";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import About from "./pages/About";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const [weatherMood, setWeatherMood] = useState(
    localStorage.getItem("weatherMood") || "",
  );
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en",
  );

  const t = translations[language];

  function toggleLanguage() {
    setLanguage((prev) => {
      const nextLanguage = prev === "en" ? "fa" : "en";
      localStorage.setItem("language", nextLanguage);
      return nextLanguage;
    });
  }

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
    <main
      className={`app ${isDarkMode ? "dark" : ""} ${weatherMood}`}
      dir={language === "fa" ? "rtl" : "ltr"}
    >
      <Navbar t={t} language={language} toggleLanguage={toggleLanguage} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Home
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                updateWeatherMood={updateWeatherMood}
                t={t}
                language={language}
              />
            }
          />

          <Route
            path="/compare"
            element={<Compare t={t} language={language} />}
          />

          <Route path="/about" element={<About t={t} />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
