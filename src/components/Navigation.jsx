import { NavLink, useLocation } from "react-router-dom";
import { pokemonLogo } from "../assets";

export default function Navigation() {
  const match = useLocation();

  const isActiveNavbar = ({ isActive }) => "nav-link " + (isActive ? "active" : "");

  // const isActiveNavbarDropdown = ({ isActive }) => "dropdown-item " + (isActive ? "active" : "")

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm bg-white">
      <div className="container-xl">
        <NavLink className="navbar-brand" to="/">
          <img src={pokemonLogo} alt="LogoJabarSejahtera" height="50" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 align-items-center ">
            <li className="nav-item mt-2 mt-lg-0 mb-lg-0">
              <NavLink
                className={isActiveNavbar}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mt-2 mt-lg-0 mb-lg-0">
              <NavLink
                className={isActiveNavbar}
                to="detail"
              >
                Pokemon Hihi
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
