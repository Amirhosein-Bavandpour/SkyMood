import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherByCity(city) {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude: city.lat,
      longitude: city.lon,
      current:
        "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      timezone: "auto",
    },
  });

  return response.data;
}