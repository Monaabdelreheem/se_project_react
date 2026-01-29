import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, isLoading, onSwitchToRegister, error }) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(values);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFormValid = values.email.trim() !== "" && values.password.trim() !== "";

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      additionalButton={
        <button
          type="button"
          className="modal__or-button"
          onClick={onSwitchToRegister}
        >
          or Register
        </button>
      }
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          className={`modal__input ${error ? "modal__input_error" : ""}`}
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {error && <span className="modal__error">{error}</span>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
