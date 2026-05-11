import { useState } from "react";

function CitySelector({ cities, selectedCity, onCityChange }) {
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) => {
    const query = search.toLowerCase().trim();

    return (
      city.name.toLowerCase().includes(query) ||
      city.faName.includes(search.trim())
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
          onCityChange(city);
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