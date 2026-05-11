import { useEffect, useState } from "react";
import "./App.css";

import { iranCities } from "./data/iranCities";
import { getWeatherByCity } from "./api/weatherApi";
import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

function App() {
  const [selectedCity, setSelectedCity] = useState(iranCities[0]);
  const [recentCities, setRecentCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  function updateRecentCities(city) {
    const updatedCities = [
      city,
      ...recentCities.filter((item) => item.name !== city.name),
    ].slice(0, 5);

    setRecentCities(updatedCities);
    localStorage.setItem("recentCities", JSON.stringify(updatedCities));
  }

  function handleCityChange(city) {
    setSelectedCity(city);
    updateRecentCities(city);
  }

  function toggleTheme() {
  setIsDarkMode((prev) => {
    localStorage.setItem("theme", !prev ? "dark" : "light");
    return !prev;
  });
  }

  async function fetchWeather(city) {
    try {
      setLoading(true);
      setError("");

      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(savedCities);
  }, []);

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  setIsDarkMode(savedTheme === "dark");
  }, []);

  function getWeatherClass() {
  if (!weather?.current?.weather_code) return "";

  const code = weather.current.weather_code;

  if (code === 0) return "sunny";
  if ([1, 2].includes(code)) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if ([45, 48].includes(code)) return "foggy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
  if ([95, 96, 99].includes(code)) return "stormy";

  return "";
  }

  return (
    <main className={`app ${isDarkMode ? "dark" : ""} ${getWeatherClass()}`}>
      <section className="container">
        <h1>Iran Weather Dashboard</h1>
        <p className="subtitle">Live weather forecast for Iranian cities</p>

        <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <CitySelector
          cities={iranCities}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />

        {recentCities.length > 0 && (
          <div className="recent-cities">
            <h3>Recent Cities</h3>

            <div className="recent-list">
              {recentCities.map((city) => (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleCityChange(city)}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <p className="status">Loading weather...</p>}
        {error && <p className="error">{error}</p>}

        {weather && !loading && (
          <>
            <WeatherCard city={selectedCity} weather={weather} />
            <ForecastList weather={weather} />
          </>
        )}
        
      </section>
    </main>
  );
}

export default App;