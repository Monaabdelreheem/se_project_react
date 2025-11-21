import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard";

export default function ClothesSection({
  clothingItems,
  weatherData,
  handleCardClick,
  handleCardDelete,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="Text">Your items</p>
        <button className="clothes-section__add-new-btn">+ Add new</button>
      </div>
      <ul className="clothes-section__list">
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
    </div>
  );
}
