import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    // normalize OpenWeather condition values so they match constants
    const cond = String(weatherData.condition || "").toLowerCase();
    const normalized =
      cond === "clouds"
        ? "cloudy"
        : cond === "thunderstorm"
        ? "storm"
        : cond === "drizzle"
        ? "rain"
        : ["mist", "smoke", "haze", "dust", "fog", "sand"].includes(cond)
        ? "fog"
        : cond;

    return option.day === weatherData.isDay && option.condition === normalized;
  });

  const weatherOption = filteredOptions[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C} &deg; {currentTemperatureUnit}</p>
      {weatherOption && (
        <img
          src={weatherOption.url}
          alt={`Card showing ${weatherOption.day ? "day" : "night"}time ${
            weatherOption.condition
          } weather`}
          className="weather-card__image"
        />
      )}
    </section>
  );
}

export default WeatherCard;
