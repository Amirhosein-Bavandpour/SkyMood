import { useEffect, useState } from "react";
import CityComparison from "../components/CityComparison";
import { loadIranCities } from "./data/loadCities";
import { motion } from "framer-motion";
import { pageAnimation } from "../utils/animations";

function Compare({ t, language }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      const loadedCities = await loadIranCities();
      setCities(loadedCities);
    }

    fetchCities();
  }, []);

  return (
    <motion.div
      className="page"
      variants={pageAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <section className="container">
        <h1>{t.compareTitle}</h1>
        <p className="subtitle">{t.compareSubtitle}</p>
        <CityComparison
          cities={cities}
          unit="celsius"
          t={t}
          language={language}
        />
      </section>
    </motion.div>
  );
}

export default Compare;
