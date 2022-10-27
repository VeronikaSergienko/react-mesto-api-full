import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-conteiner">
        <input
          type="text"
          value={name || "Жак-Ив Кусто"}
          onChange={handleChangeName}
          name="input-name"
          id="popup-name"
          placeholder="Имя"
          className="popup__input"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error popup-name-error"></span>
      </div>
      <div className="popup__input-conteiner">
        <input
          type="text"
          value={description || "Исследователь океана"}
          onChange={handleChangeDescription}
          name="input-job"
          id="popup-about"
          placeholder="Род деятельности"
          className="popup__input"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error popup-about-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
