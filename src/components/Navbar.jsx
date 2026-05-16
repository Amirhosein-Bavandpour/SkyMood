import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ t, language, toggleLanguage }) {
  return (
    <nav className="navbar">

      <div>
        <NavLink to="/">{t.home}</NavLink>
        <NavLink to="/compare">{t.compare}</NavLink>
        <NavLink to="/about">{t.about}</NavLink>

        <motion.button
          className="language-toggle"
          onClick={toggleLanguage}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {language === "en" ? "FA" : "EN"}
        </motion.button>
      </div>
    </nav>
  );
}

export default Navbar;
