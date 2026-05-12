import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Wind, Activity, Sun } from "lucide-react";
import { getWeatherByCity, getAirQualityByCoords } from "../api/weatherApi";
import { getWeatherInfo } from "../utils/weatherCodes";
import { getAqiInfo } from "../utils/airQuality";
import ForecastList from "./ForecastList";
import WeatherCharts from "./WeatherCharts";

function convertTemp(temp, unit) {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }

  return Math.round(temp);
}

function CityComparison({ cities = [], unit = "celsius", t, language }) {
  const [firstCity, setFirstCity] = useState(null);
  const [secondCity, setSecondCity] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

  useEffect(() => {
    if (cities.length > 0) {
      setFirstCity(cities[0]);
      setSecondCity(cities[1] || cities[0]);
    }
  }, [cities]);

  async function handleCompare() {
    if (!firstCity || !secondCity) return;

    try {
      setLoading(true);

      const [firstWeather, secondWeather, firstAir, secondAir] =
        await Promise.all([
          getWeatherByCity(firstCity),
          getWeatherByCity(secondCity),
          getAirQualityByCoords(firstCity.lat, firstCity.lon),
          getAirQualityByCoords(secondCity.lat, secondCity.lon),
        ]);

      setComparison({
        first: {
          city: firstCity,
          weather: firstWeather,
          air: firstAir,
        },
        second: {
          city: secondCity,
          weather: secondWeather,
          air: secondAir,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  function renderCityCard(data) {
    const current = data.weather.current;
    const daily = data.weather.daily;
    const air = data.air?.current;

    const weatherInfo = getWeatherInfo(current.weather_code);
    const aqiInfo = air ? getAqiInfo(air.us_aqi) : null;

    return (
      <motion.div
        className="compare-detail-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="compare-city-header">
          <h3>{data.city.name}</h3>
          <p className="city-fa">{data.city.faName}</p>

          <div className="weather-icon">{weatherInfo.icon}</div>

          <h2>
            {convertTemp(current.temperature_2m, unit)}
            {unitSymbol}
          </h2>

          <p>{weatherInfo.label}</p>
        </div>

        <div className="compare-data-grid">
          <span>
            🌡️ {t.feelsLike}: {convertTemp(current.apparent_temperature, unit)}
            {unitSymbol}
          </span>

          <span>💧 Humidity: {current.relative_humidity_2m}%</span>

          <span>💨 Wind: {current.wind_speed_10m} km/h</span>

          <span>
            🌅 {t.sunrise}: {daily.sunrise[0].slice(11, 16)}
          </span>

          <span>
            🌇 {t.sunset}: {daily.sunset[0].slice(11, 16)}
          </span>

          {air && (
            <>
              <span>
                {aqiInfo.emoji} AQI: {air.us_aqi}
              </span>

              <span>
                <Activity size={18} />
                PM2.5: {air.pm2_5}
              </span>

              <span>🔆 UV: {air.uv_index}</span>
            </>
          )}
        </div>

        <div className="compare-forecast">
          <ForecastList
            weather={data.weather}
            unit={unit}
            t={t}
            language={language}
          />
        </div>

        <div className="compare-charts">
          <WeatherCharts
            weather={data.weather}
            unit={unit}
            t={t}
            language={language}
          />
        </div>
      </motion.div>
    );
  }

  if (!firstCity || !secondCity) {
    return <p className="error">No cities available for comparison.</p>;
  }

  return (
    <section className="comparison">
      <h3>{t.compareTitle}</h3>

      <div className="comparison-controls">
        <select
          value={firstCity.name}
          onChange={(e) => {
            const city = cities.find((city) => city.name === e.target.value);
            if (city) setFirstCity(city);
          }}
        >
          {cities.map((city) => (
            <option key={`${city.name}-${city.lat}`} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <select
          value={secondCity.name}
          onChange={(e) => {
            const city = cities.find((city) => city.name === e.target.value);
            if (city) setSecondCity(city);
          }}
        >
          {cities.map((city) => (
            <option key={`${city.name}-${city.lon}`} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <motion.button
          onClick={handleCompare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? t.comparing : t.compareButton}
        </motion.button>
      </div>

      {comparison && (
        <div className="compare-detail-grid">
          {renderCityCard(comparison.first)}
          {renderCityCard(comparison.second)}
        </div>
      )}
    </section>
  );
}

export default CityComparison;
