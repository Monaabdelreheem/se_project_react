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

const isOwn = currentUser && (item.owner === currentUser._id || item.owner?._id === currentUser._id);

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
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="323" height="200"%3E%3Crect width="323" height="200" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%23999"%3EImage not available%3C/text%3E%3C/svg%3E';
        }}
      />
      {isOwn && (
        <button
          className="card__delete-button"
          onClick={() => onCardDelete(item)}
        />
      )}
    </li>
  );
}

export default ItemCard;
