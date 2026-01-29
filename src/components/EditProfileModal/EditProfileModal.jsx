import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, resetForm, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
