import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Iran Weather</h2>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;