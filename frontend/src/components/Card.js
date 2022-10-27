import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <article className="element" id="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={() => handleDeleteClick()}
      ></button>
      <img
        className="element__image"
        src={`${props.link}`}
        onClick={() => handleClick()}
        alt={`${props.name}`}
      />
      <div className="element__text-conteiner">
        <h2 className="element__text">{props.name}</h2>
        <div className="element__likes-conteiner">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => handleLikeClick()}
          ></button>
          <p className="element__likes">{props.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export { Card };
