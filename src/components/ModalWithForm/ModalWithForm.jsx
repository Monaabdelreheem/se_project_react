import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";
import closebtn from "../../assets/closebtn.png";

function ModalWithForm({
  children,
  buttonText,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img className="close__button" src={closebtn} alt="Close modal" />
        </button>
        <form className="modal__form" onSubmit={onSubmit} name={name}>
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
