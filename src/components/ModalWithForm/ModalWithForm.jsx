import "./ModalWithForm.css";
import closebtn from "../../assets/closebtn.png"

function ModalWithForm( { children, buttonText, title, activeModal, onClose } ) {

    const isOpen = activeModal === "add-garment";
    const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) onClose();
  };


    return (
   <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={handleOverlayClick} >
    <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2> 
      <button onClick={onClose} type="button" className="modal__close">
        <img className="close__button" src={closebtn} />
        </button>
    <form className="modal__form">
        {children}
            <button type="submit" className="modal__submit">
                {buttonText}
            </button>
    </form>
    </div>
   </div>
);
}



export default ModalWithForm;