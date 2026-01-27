import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  // if (!currentUser) return null;

  return (
    <header className="header">
  {/* LEFT */}
  <div className="header__left">
    <NavLink to="/" className="header__nav-link">
      <img
        className="header__logo"
        src={logo}
        alt="Weather Wardrobe logo"
      />
    </NavLink>

    <p className="header__date-and-location">
      {currentDate}, {weatherData.city}
    </p>
  </div>

  {/* RIGHT */}
  <div className="header__right">
    <ToggleSwitch />

    {isLoggedIn ? (
      <>
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>

        <NavLink to="/profile" className="header__nav-link">
          <div className="header__user-container">
            <p className="header__username">{currentUser?.name}</p>

            <img
              src={currentUser?.avatar || avatar}
              alt={currentUser?.name}
              className="header__avatar"
            />
          </div>
        </NavLink>
      </>
    ) : (
      <>
        <button
          type="button"
          onClick={handleRegisterClick}
          className="header__register-btn"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleLoginClick}
          className="header__login-btn"
        >
          Log In
        </button>
      </>
    )}
  </div>
</header>


  );
}

export default Header;
