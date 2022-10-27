import React from "react";
import Popup from "./Popup";

function ImagePopup({
  onClose,
  card: {
    isOpen,
    card: { name, link },
  },
}) {
  return (
    <Popup name="place-image" isOpen={isOpen} onClose={onClose} type="image">
      <img className="popup__place-image" src={`${link}`} alt={`${name}`} />
      <p className="popup__place-title">{`${name}`}</p>
    </Popup>
  );
}

export default ImagePopup;
