export function getWeatherInfo(code) {
  const weatherMap = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Cloudy", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    61: { label: "Rain", icon: "🌧️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "⛈️" },
    71: { label: "Snow", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
  };

  return weatherMap[code] || { label: "Unknown", icon: "🌡️" };
}