import "./Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems,
  handleCardClick,
  handleCardDelete,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temp?.[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
