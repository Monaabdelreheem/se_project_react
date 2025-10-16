import "./ItemModal.css";
import itemclosebtn from "../../assets/itemclosebtn.png";

function ItemModal({ activeModal, onClose, card }) {
return (
    <div className="item-modal__wrapper">
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className="modal__content_type_image">
            <button 
            onClick={onClose} 
            type="button" 
            className="modal__close">
                <img className="close__button" src={itemclosebtn} alt="Item close button" />
            </button>
            <img src={card.link} alt="" className="modal__image" />
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