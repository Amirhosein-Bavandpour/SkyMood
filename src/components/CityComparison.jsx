import { useEffect, useState } from "react";
import { getWeatherByCity } from "../api/weatherApi";
import { getWeatherInfo } from "../utils/weatherCodes";

function CityComparison({ cities = [], unit, t }) {
  const [firstCity, setFirstCity] = useState(cities[0] || null);
  const [secondCity, setSecondCity] = useState(cities[1] || cities[0] || null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cities.length > 0) {
      setFirstCity(cities[0]);
      setSecondCity(cities[1] || cities[0]);
    }
  }, [cities]);

  if (!firstCity || !secondCity) {
    return <p className="error">No cities available for comparison.</p>;
  }

  function convertTemp(temp) {
    if (unit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }

    return Math.round(temp);
  }

  async function handleCompare() {
    try {
      setLoading(true);

      const [firstWeather, secondWeather] = await Promise.all([
        getWeatherByCity(firstCity),
        getWeatherByCity(secondCity),
      ]);

      setComparison({
        first: firstWeather.current,
        second: secondWeather.current,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="comparison">
      <h3>Compare Cities</h3>

      <div className="comparison-controls">
        <select
          value={firstCity?.name || ""}
          onChange={(e) => {
            const city = cities.find((city) => city.name === e.target.value);
            if (city) setFirstCity(city);
          }}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <select
          value={secondCity?.name || ""}
          onChange={(e) => {
            const city = cities.find((city) => city.name === e.target.value);
            if (city) setSecondCity(city);
          }}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <button onClick={handleCompare}>
          {loading ? t.comparing : t.compareButton}
        </button>
      </div>

      {comparison && (
        <div className="comparison-result">
          <div>
            <h4>{firstCity.name}</h4>
            <p className="compare-icon">
              {getWeatherInfo(comparison.first.weather_code).icon}
            </p>
            <strong>
              {convertTemp(comparison.first.temperature_2m)}
              {unit === "fahrenheit" ? "°F" : "°C"}
            </strong>
          </div>

          <div>
            <h4>{secondCity.name}</h4>
            <p className="compare-icon">
              {getWeatherInfo(comparison.second.weather_code).icon}
            </p>
            <strong>
              {convertTemp(comparison.second.temperature_2m)}
              {unit === "fahrenheit" ? "°F" : "°C"}
            </strong>
          </div>
        </div>
      )}
    </section>
  );
}

export default CityComparison;
