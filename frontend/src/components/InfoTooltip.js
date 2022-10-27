import React from "react";
import Popup from "./Popup";
import { ReactComponent as OkIcon } from "../images/successful-registration.svg";
import { ReactComponent as FailIcon } from "../images/fail-registration.svg";

function InfoTooltip({ isOpen, onClose, message, isOk }) {
  return (
    <Popup name="info-too-tip" type="info" isOpen={isOpen} onClose={onClose}>
      {isOk ? (
        <OkIcon className="popup__image-info" />
      ) : (
        <FailIcon className="popup__image-info" />
      )}
      <h1 className="popup__title">{message}</h1>
    </Popup>
  );
}

export default InfoTooltip;
