import { useEffect, useState } from "react";
import "./App.css";

import { iranCities } from "./data/iranCities";
import { getWeatherByCity } from "./api/weatherApi";
import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

function App() {
  const [selectedCity, setSelectedCity] = useState(iranCities[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <main className="app">
      <section className="container">
        <h1>Iran Weather Dashboard</h1>
        <p className="subtitle">Live weather forecast for Iranian cities</p>

        <CitySelector
          cities={iranCities}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />

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