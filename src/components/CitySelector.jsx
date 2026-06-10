import { useState } from "react";
import { normalizeText } from "../utils/textNormalize";
import { motion } from "framer-motion";

function CitySelector({
  cities = [],
  selectedCity,
  onCityChange,
  t,
  language,
}) {
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) => {
    const query = normalizeText(search);

    return (
      normalizeText(city.name).includes(query) ||
      normalizeText(city.faName).includes(query)
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
        aria-label={language === "fa" ? "انتخاب شهر " : "Select city"}
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
            {language === "fa" ? city.faName || city.name : city.name}
          </option>
        ))}
      </select>

      <motion.button
        type="submit"
        className="search-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t.searchWeather}
      </motion.button>

      {filteredCities.length === 0 && (
        <p className="empty-message">{t.noCityFound}</p>
      )}
    </form>
  );
}

export default CitySelector;
