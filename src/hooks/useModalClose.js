// src/hooks/useModalClose.js
import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return; // Only add listeners when the modal is open

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlay = (e) => {
      // Close only if clicking directly on the overlay (element with class "modal")
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]); // Re-run when modal opens/closes or onClose changes
}

export default useModalClose;
