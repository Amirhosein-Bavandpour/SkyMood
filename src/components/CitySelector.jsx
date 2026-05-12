import { useState } from "react";
import { normalizeText } from "../utils/textNormalize";

function CitySelector({ cities = [], selectedCity, onCityChange, t }) {
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) => {
    const query = search.toLowerCase().trim();

    return (
      city.name?.toLowerCase().includes(query) ||
      city.faName?.toLowerCase().includes(query)
    );
  });

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (filteredCities.length === 0) return;

    onCityChange(filteredCities[0]);
    setSearch("");
  }

  return (
    <form className="city-selector" onSubmit={handleSearchSubmit}>
      <label>{t.searchCity}</label>

      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selectedCity?.name || ""}
        onChange={(e) => {
          const city = cities.find((item) => item.name === e.target.value);

          if (city) {
            onCityChange(city);
            setSearch("");
          }
        }}
      >
        {filteredCities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} - {city.faName}
          </option>
        ))}
      </select>

      <button type="submit" className="search-button">
        {t.searchWeather}
      </button>

      {filteredCities.length === 0 && (
        <p className="empty-message">{t.noCityFound}</p>
      )}
    </form>
  );
}

export default CitySelector;
