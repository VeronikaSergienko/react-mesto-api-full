import React from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  array,
  userEmail,
  onSignOut,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        headerText={"Выйти"}
        headerLink={"/sign-in"}
        userEmail={userEmail}
        onSignOut={onSignOut}
      />
      <main className="content">
        <section className="profile">
          <div
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="profile__profile-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="открытьФорму"
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__type-of-activity">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements">
          {array.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                link={card.link}
                name={card.name}
                likes={card.likes}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
