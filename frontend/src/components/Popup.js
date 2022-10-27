import React, { useEffect } from "react";

function Popup({ children, name, isOpen, onClose, type }) {
    const handleOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }
    const handleCloseIconClick = () => {
        onClose();
    }
    useEffect (() => {
        const handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            };
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
        } else {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [isOpen]);
  return (
    <div
      className={`popup popup_type_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup__content-${type}`}
      >
        <button
          aria-label="close"
          type="button"
          className="popup__clouse-button"
          onClick={handleCloseIconClick}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
