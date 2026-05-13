const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export function getCachedData(key) {
  const cachedItem = localStorage.getItem(key);

  if (!cachedItem) return null;

  try {
    const parsedItem = JSON.parse(cachedItem);
    const isExpired = Date.now() - parsedItem.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function setCachedData(key, data) {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(cacheItem));
}

export function createWeatherCacheKey(city) {
  return `weather-${city.name}-${city.lat}-${city.lon}`;
}

export function createAirCacheKey(city) {
  return `air-${city.name}-${city.lat}-${city.lon}`;
}

export function createCoordsWeatherCacheKey(lat, lon) {
  return `weather-coords-${lat.toFixed(3)}-${lon.toFixed(3)}`;
}

export function createCoordsAirCacheKey(lat, lon) {
  return `air-coords-${lat.toFixed(3)}-${lon.toFixed(3)}`;
}
