import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { mestoAuth } from "../utils/api";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [textInfoPopupOpen, setTextInfoPopupOpen] = useState(
    "Вы успешно зарегистрировались!"
  );
  const [isSucceed, setIsSucceed] = useState(true);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const [currentUser, setcurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(JSON.parse(jwt));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
        .then(([profile, cards]) => {
          setcurrentUser(profile);
          setCurrentCards(cards);
        })
      history.push("/");
    }
  }, [history, loggedIn]);

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, card: {} });
    setInfoPopupOpen(false);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, card: card });
  };

  // console.log(process.env.NODE_ENV);
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikes(card._id, isLiked)
      .then((newCard) => {
        setCurrentCards((currentCards) =>
          currentCards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCurrentCards((currentCards) =>
          currentCards.filter((c) => !(c._id === card._id))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .patchUserInfo({ name, about })
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .patchUserAvatar({ avatar })
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .postCard(newCard)
      .then((res) => {
        setCurrentCards([res, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegistration = ({ email, password }) => {
    mestoAuth
      .register({ email, password })
      .then((res) => {
        if (res) {
          setTextInfoPopupOpen("Вы успешно зарегистрировались!");
          setIsSucceed(true);
          setInfoPopupOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setTextInfoPopupOpen("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSucceed(false);
        setInfoPopupOpen(true);
        console.log(err);
      });
  };

  const auth = async (jwt) => {
    mestoAuth
      .getContent(jwt)
      .then((res) => {
        if (res.email) {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    mestoAuth
      .authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", JSON.stringify(res.token));
        setLoggedIn(true);
        auth(res.token);
        history.push("/");
      })
      .catch((err) => {
        setTextInfoPopupOpen("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSucceed(false);
        setInfoPopupOpen(true);
        console.log(err);
      });
  };



  const handleSignOut = () => {
    setEmail("");
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            array={currentCards}
            userEmail={email}
            onSignOut={handleSignOut}
          />
          <Route exact path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>
          <Route exact path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect exact to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          message={textInfoPopupOpen}
          isOk={isSucceed}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
