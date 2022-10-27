import React from "react";
import Popup from "./Popup";

const PopupWithForm = ({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  classButton,
}) => {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose} type="form">
      <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
        <h2 className={`popup__title ${classButton}`}>{`${title}`}</h2>
        {children}
        <button type="submit" className={`popup__save-button ${classButton}`}>
          {buttonText}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
