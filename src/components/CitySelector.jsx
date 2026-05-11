import { useState } from "react";
import { normalizeText } from "../utils/textNormalize";

function CitySelector({ cities, selectedCity, onCityChange }) {
  const [search, setSearch] = useState("");

  if (!selectedCity) {
    return null;
  }

  const filteredCities = cities.filter((city) => {
    const query = normalizeText(search);

    return (
      normalizeText(city.name).includes(query) ||
      normalizeText(city.faName).includes(query) ||
      normalizeText(city.province).includes(query)
    );
  });

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!filteredCities.length) return;

    onCityChange(filteredCities[0]);
    setSearch("");
  }

  return (
    <form className="city-selector" onSubmit={handleSearchSubmit}>
      <label>Search Iran City</label>

      <input
        type="text"
        placeholder="Type Tehran, Shiraz, مشهد..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selectedCity.name}
        onChange={(e) => {
          const city = cities.find((item) => item.name === e.target.value);
          if (city) {
            onCityChange(city);
            setSearch("");
          }
          setSearch("");
        }}
      >
        {filteredCities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} - {city.faName}
          </option>
        ))}
      </select>

      <button type="submit" className="search-button">
        Search Weather
      </button>

      {filteredCities.length === 0 && (
        <p className="empty-message">No city found</p>
      )}
    </form>
  );
}

export default CitySelector;
