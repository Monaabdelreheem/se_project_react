import "./ItemModal.css";
import itemclosebtn from "../../assets/itemclosebtn.png";

function ItemModal({ activeModal, onClose, card }) {
    const isOpen = activeModal === "preview";
    const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) onClose();
  };

return (
    <div className="item-modal__wrapper">
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}
    onClick={handleOverlayClick}
    >
        <div className="modal__content_type_image" onClick={(e) => e.stopPropagation()}>
            <button 
            onClick={onClose} 
            type="button" 
            className="modal__close">
                <img className="close__button" src={itemclosebtn} alt="Item close button" />
            </button>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__footer">
                <h3 className="modal__caption">{card.name}</h3>
                <p className="modal__weather">Weather: {card.weather}</p>
            </div>
        </div>
    </div>
    </div>
)
}


export default ItemModal;