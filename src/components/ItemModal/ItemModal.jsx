import "./ItemModal.css";
import itemclosebtn from "../../assets/itemclosebtn.png";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const isOpen = activeModal === "preview";

  useModalClose(isOpen, onClose);

  return (
    <div className="item-modal__wrapper">
      <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
        <div className="modal__content_type_image">
          <button onClick={onClose} type="button" className="modal__close">
            <img
              className="close__button"
              src={itemclosebtn}
              alt="Item close button"
            />
          </button>

          <img src={card.imageUrl} alt={card.name} className="modal__image" />

          <div className="modal__footer">
            <div className="footer__caption-delete">
              <h3 className="modal__caption">{card.name}</h3>
              <button
                className="item-modal__delete-button"
                onClick={() => onDelete(card)}
              >
                Delete item
              </button>
            </div>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
