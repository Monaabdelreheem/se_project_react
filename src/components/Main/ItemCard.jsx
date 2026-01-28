import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

const isLiked = item.likes?.some(
 (like) =>
    like === currentUser?._id ||
    like?._id === currentUser?._id
) || false;

const handleLike = () => {
  if (!currentUser) return;
  onCardLike({ id: item._id, isLiked });
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
    </li>
  );
}

export default ItemCard;
