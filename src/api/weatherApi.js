import axios from "axios";
import {
  getCachedData,
  setCachedData,
  createWeatherCacheKey,
  createAirCacheKey,
  createCoordsWeatherCacheKey,
  createCoordsAirCacheKey,
} from "../utils/cache";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherByCity(city) {
  const cacheKey = createWeatherCacheKey(city);
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await axios.get(BASE_URL, {
    params: {
      latitude: city.lat,
      longitude: city.lon,
      current:
        "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
      hourly: "temperature_2m,relative_humidity_2m",
      daily:
        "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset",
      timezone: "auto",
    },
  });

  setCachedData(cacheKey, response.data);
  return response.data;
}

export async function getWeatherByCoords(lat, lon) {
  const cacheKey = createCoordsWeatherCacheKey(lat, lon);
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current:
        "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
      hourly: "temperature_2m,relative_humidity_2m",
      daily:
        "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset",
      timezone: "auto",
    },
  });

  setCachedData(cacheKey, response.data);
  return response.data;
}

const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export async function getAirQualityByCoords(lat, lon, cityName = "coords") {
  const cacheKey =
    cityName === "coords"
      ? createCoordsAirCacheKey(lat, lon)
      : createAirCacheKey({ name: cityName, lat, lon });

  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await axios.get(AIR_QUALITY_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current: "us_aqi,pm2_5,pm10,uv_index",
      timezone: "auto",
    },
  });

  setCachedData(cacheKey, response.data);
  return response.data;
}
