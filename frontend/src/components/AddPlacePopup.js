import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [namePlace, setNamePlace] = React.useState('');
    const [linkPlace, setLinkPlace] = React.useState('');

    function handleChangeNamePlace(e) {
        setNamePlace(e.target.value);
      }
      
    function handleChangeLinkPlace(e) {
        setLinkPlace(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            title: namePlace,
            link: linkPlace,
        });
      } 

    return (
        <PopupWithForm
        name={"new-place"}
        title={"Новое место"}
        isOpen={isOpen}
        onClose={onClose}
        buttonText={"Создать"}
        onSubmit={handleSubmit}
      >
        <div className="popup__input-conteiner">
          <input
            type="text"
            value={namePlace}
            onChange={handleChangeNamePlace}
            name="input-title"
            id="popup-title"
            placeholder="Название"
            className="popup__input"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error popup-title-error"></span>
        </div>
        <div className="popup__input-conteiner">
          <input
            type="url"
            value={linkPlace}
            onChange={handleChangeLinkPlace}
            name="input-link"
            id="popup-link"
            placeholder="Ссылка на картинку"
            className="popup__input"
            required
          />
          <span className="popup__input-error popup-link-error"></span>
        </div>
      </PopupWithForm>
    )
}

export default AddPlacePopup;