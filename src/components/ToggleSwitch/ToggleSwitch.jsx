import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  // console.log("Current Unit in ToggleSwitch:", currentTemperatureUnit);
  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle" />
      <span
        style={{
          color: `${currentTemperatureUnit === "F" ? "white" : "gray"}`,
        }}
        className="toggle-switch__text toggle-switch__text_F"
      >
        F
      </span>
      <span
        style={{
          color: `${currentTemperatureUnit === "C" ? "white" : "gray"}`,
        }}
        className="toggle-switch__text toggle-switch__text_C"
      >
        C
      </span>
    </label>
  );
}
