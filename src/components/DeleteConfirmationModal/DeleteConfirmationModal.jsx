// import "./DeleteConfirmationModal.css";

// function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <div className="modal__content">
//         <button className="modal__close" onClick={onClose}>X</button>
//         <h3 className="modal__title">Are you sure?</h3>
//         <p className="modal__text">
//           Do you really want to delete this item?
//         </p>
//         <div className="modal__buttons">
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={onConfirm}>Yes, delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default DeleteConfirmationModal;

import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal__content">
        
        <button className="confirmation-modal__close" onClick={onClose}>
          ×
        </button>

        <h3 className="confirmation-modal__title">
          Are you sure you want to delete this item?
        </h3>

        <p className="confirmation-modal__subtitle">
          This action is irreversible.
        </p>

        <button className="confirmation-modal__confirm" onClick={onConfirm}>
          Yes, delete item
        </button>

        <button className="confirmation-modal__cancel" onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
