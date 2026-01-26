import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

export default function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="SideBar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="SideBar__avatar"
          />
        ) : (
          <div className="SideBar__avatar-placeholder">
            {currentUser?.name?.[0]}
          </div>
        )}

        <p className="SideBar__username">{currentUser?.name}</p>
      </div>

      <button
        type="button"
        className="SideBar__edit-btn"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
    </aside>
  );
}
