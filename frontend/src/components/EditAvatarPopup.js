import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const linkRef = React.useRef({});

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"edit-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-conteiner">
        <input
          type="text"
          ref={linkRef}
          name="input-avatar"
          id="popup-avatar"
          placeholder="Ссылка"
          className="popup__input"
          minLength="2"
          maxLength="100"
          required
        />
        <span className="popup__input-error popup-avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
