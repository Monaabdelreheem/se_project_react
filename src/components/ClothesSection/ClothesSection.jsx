import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleCardDelete,
  onAddNew,
  onCardLike,
}) {

  const currentUser = useContext(CurrentUserContext);
  
  const userItems = clothingItems.filter((item) => currentUser && (item.owner === currentUser._id || item.owner?._id === currentUser._id));
  
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="Text">Your items</p>
        <button className="clothes-section__add-new-btn" onClick={onAddNew}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => (
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
