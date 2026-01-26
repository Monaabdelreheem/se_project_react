import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  handleSignOut,
  isLoggedIn,
  currentUser,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__nav-link">
        <img className="header__logo" src={logo} alt="Weather Wardrobe logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {!isLoggedIn ? (
        <div className="header__auth">
          <button
            type="button"
            className="header__auth-btn"
            onClick={handleLoginClick}
          >
            Log in
          </button>

          <button
            type="button"
            className="header__auth-btn"
            onClick={handleRegisterClick}
          >
            Sign up
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>

          <NavLink to="/profile" className="header__nav-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            </div>
          </NavLink>
          <button
            type="button"
            onClick={handleSignOut}
            className="header__signout-btn"
          >
            Sign out
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
