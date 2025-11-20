import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="SideBar__user-container">
        <img src={avatar} alt="Terrence Tegegne" className="SideBar__avatar" />
        <p className="SideBar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}
