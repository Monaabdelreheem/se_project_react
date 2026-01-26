import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onCardLike(item);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__title-row">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={handleLike}
        />
      )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {item.owner === currentUser?._id && (
        <button
          className="card__delete-button"
          onClick={() => onCardDelete(item)}
        />
      )}
    </li>
  );
}

export default ItemCard;
