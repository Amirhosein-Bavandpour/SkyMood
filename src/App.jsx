import { useEffect, useState } from "react";
import "./App.css";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getAirQualityByCoords,
} from "./api/weatherApi";
import { loadIranCities } from "./data/loadCities";
import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import SkeletonWeather from "./components/SkeletonWeather";

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [recentCities, setRecentCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [airQuality, setAirQuality] = useState(null);

  function updateRecentCities(city) {
    const updatedCities = [
      city,
      ...recentCities.filter((item) => item.name !== city.name),
    ].slice(0, 5);

    setRecentCities(updatedCities);
    localStorage.setItem("recentCities", JSON.stringify(updatedCities));
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

  function toggleUnit() {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  }

  function handleCityChange(city) {
    setLocationName("");
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

      const [weatherData, airQualityData] = await Promise.all([
        getWeatherByCity(city),
        getAirQualityByCoords(city.lat, city.lon),
      ]);

      setWeather(weatherData);
      setAirQuality(airQualityData);
    } catch (err) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCities() {
      const loadedCities = await loadIranCities();

      setCities(loadedCities);

      if (loadedCities.length > 0) {
        setSelectedCity(loadedCities[0]);
      }
    }

    fetchCities();
  }, []);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(savedCities);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  function getWeatherClass() {
    if (weather?.current?.weather_code === undefined) return "";

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
        <div className="button-group">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button className="location-button" onClick={handleUseMyLocation}>
            📍 Use My Location
          </button>

          <button className="unit-toggle" onClick={toggleUnit}>
            {unit === "celsius" ? "°F Fahrenheit" : "°C Celsius"}
          </button>
        </div>
        {selectedCity && (
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        )}
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

        {loading && <SkeletonWeather />}
        {error && <p className="error">{error}</p>}

        {weather && selectedCity && !loading && !error && (
          <>
            <WeatherCard
              city={
                locationName ? { name: locationName, faName: "" } : selectedCity
              }
              weather={weather}
              airQuality={airQuality}
              unit={unit}
            />

            <ForecastList weather={weather} unit={unit} />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
