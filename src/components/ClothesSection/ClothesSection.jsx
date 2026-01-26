import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard";

export default function ClothesSection({
  clothingItems,
  weatherData,
  handleCardClick,
  handleCardDelete,
  onAddNew,
  onCardLike,
}) {

  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="Text">Your items</p>
        <button className="clothes-section__add-new-btn" onClick={onAddNew}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}
