import { NavLink } from "react-router-dom";

function Navbar({ t, language, toggleLanguage }) {
  return (
    <nav className="navbar">
      <h2>{t.appName}</h2>

      <div>
        <NavLink to="/">{t.home}</NavLink>
        <NavLink to="/compare">{t.compare}</NavLink>
        <NavLink to="/about">{t.about}</NavLink>

        <button className="language-toggle" onClick={toggleLanguage}>
          {language === "en" ? "FA" : "EN"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
