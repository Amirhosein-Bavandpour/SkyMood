import { useEffect, useState } from "react";
import { loadIranCities } from "./data/loadCities";
import { motion } from "framer-motion";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getAirQualityByCoords,
} from "../api/weatherApi";
import WeatherCharts from "../components/WeatherCharts";
import CitySelector from "../components/CitySelector";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import SkeletonWeather from "../components/SkeletonWeather";
import { pageAnimation } from "../utils/animations";

function getWeatherClassByCode(code) {
  if (code === 0) return "sunny";
  if ([1, 2].includes(code)) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if ([45, 48].includes(code)) return "foggy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
  if ([95, 96, 99].includes(code)) return "stormy";

  return "";
}

function Home({ isDarkMode, toggleTheme, updateWeatherMood, t, language }) {
  useEffect(() => {
    async function fetchCities() {
      try {
        const loadedCities = await loadIranCities();

        setCities(loadedCities);

        const tehran =
          loadedCities.find((city) => city.name === "Tehran") ||
          loadedCities[0];

        setSelectedCity(tehran);
      } catch (err) {
        setError("Could not load cities.");
      }
    }

    fetchCities();
  }, []);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [recentCities, setRecentCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [unit, setUnit] = useState("celsius");

  function isFavorite(city) {
    return favoriteCities.some((item) => item.name === city?.name);
  }

  function toggleFavorite(city) {
    if (!city) return;

    let updatedFavorites;

    if (isFavorite(city)) {
      updatedFavorites = favoriteCities.filter(
        (item) => item.name !== city.name,
      );
    } else {
      updatedFavorites = [city, ...favoriteCities].slice(0, 8);
    }

    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  }

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteCities")) || [];

    setFavoriteCities(savedFavorites);
  }, []);

  function updateRecentCities(city) {
    const updatedCities = [
      city,
      ...recentCities.filter((item) => item.name !== city.name),
    ].slice(0, 5);

    setRecentCities(updatedCities);
    localStorage.setItem("recentCities", JSON.stringify(updatedCities));
  }

  function handleCityChange(city) {
    if (!city) return;

    setLocationName("");
    setSelectedCity(city);
    updateRecentCities(city);
  }

  function toggleUnit() {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  }

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

  async function fetchWeather(city) {
    if (!city?.lat || !city?.lon) {
      setError("Selected city is invalid.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [weatherData, airQualityData] = await Promise.all([
        getWeatherByCity(city),
        getAirQualityByCoords(city.lat, city.lon, city.name),
      ]);

      setWeather(weatherData);
      updateWeatherMood(
        getWeatherClassByCode(weatherData.current.weather_code),
      );
      setAirQuality(airQualityData);
    } catch (err) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [weatherData, airQualityData] = await Promise.all([
            getWeatherByCoords(latitude, longitude),
            getAirQualityByCoords(latitude, longitude),
          ]);

          setWeather(weatherData);
          updateWeatherMood(
            getWeatherClassByCode(weatherData.current.weather_code),
          );
          setAirQuality(airQualityData);
          setLocationName("Your Location");
        } catch (err) {
          setError("Could not fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      },
    );
  }

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(savedCities);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  return (
    <motion.div
      className="home-page"
      variants={pageAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <section className="container">
        <h1>{t.dashboardTitle}</h1>
        <p className="subtitle">{t.dashboardSubtitle}</p>
        <div className="button-group">
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? t.lightMode : t.darkMode}
          </motion.button>

          <motion.button
            className="location-button"
            onClick={handleUseMyLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.useMyLocation}
          </motion.button>

          <motion.button
            className="unit-toggle"
            onClick={toggleUnit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {unit === "celsius" ? t.fahrenheit : t.celsius}
          </motion.button>

          <motion.button
            className="favorite-toggle"
            onClick={() => toggleFavorite(selectedCity)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFavorite(selectedCity) ? t.savedCity : t.saveCity}
          </motion.button>
        </div>

        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          t={t}
        />

        {recentCities.length > 0 && (
          <div className="recent-cities">
            <h3>{t.recentCities}</h3>
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

        {favoriteCities.length > 0 && (
          <div className="favorite-cities">
            <h3>{t.favoriteCities}</h3>

            <div className="favorite-list">
              {favoriteCities.map((city) => (
                <div className="favorite-chip" key={city.name}>
                  <button
                    type="button"
                    className="favorite-city-button"
                    onClick={() => handleCityChange(city)}
                  >
                    ⭐ {city.name}
                  </button>

                  <button
                    type="button"
                    className="remove-favorite"
                    onClick={() => toggleFavorite(city)}
                    aria-label={`${t.removeFavorite} ${city.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && <p className="error">{error}</p>}

        {loading && <SkeletonWeather />}

        {weather && !loading && !error && (
          <div className="dashboard-grid">
            <div className="dashboard-main">
              <WeatherCard
                city={
                  locationName
                    ? { name: locationName, faName: "" }
                    : selectedCity
                }
                weather={weather}
                airQuality={airQuality}
                unit={unit}
                t={t}
              />

              <ForecastList
                weather={weather}
                unit={unit}
                t={t}
                language={language}
              />
            </div>

            <div className="dashboard-side">
              <WeatherCharts
                weather={weather}
                unit={unit}
                t={t}
                language={language}
              />
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}

export default Home;
