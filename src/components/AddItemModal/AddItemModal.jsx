import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();
    
    onAddItem(values)
    .then(() => {
      resetForm();
      onClose();
    })
    .catch((err) => {
      console.error("Error adding item:", err);
    });
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      name="new-card"
    >
      <div className="modal__field">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value="hot"
              className="modal__radio_input"
              id="hot"
              checked={values.weather === "hot"}
              onChange={handleChange}
              required
            />{" "}
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              value="warm"
              className="modal__radio_input"
              id="warm"
              checked={values.weather === "warm"}
              onChange={handleChange}
            />{" "}
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              value="cold"
              className="modal__radio_input"
              id="cold"
              checked={values.weather === "cold"}
              onChange={handleChange}
            />{" "}
            Cold
          </label>
        </fieldset>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
