import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.js";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email,
      password,
    });
  }

  return (
    <div>
      <Header headerText={"Войти"} headerLink={"/sign-in"} />
      <div className="registration-form">
        <form className="popup__form" onSubmit={handleSubmit}>
          <h2 className="registration-form__title">Регистрация</h2>
          <div className="registration-form__input-conteiner">
            <input
              type="e-mail"
              placeholder="E-mail"
              value={email}
              onChange={handleChangeEmail}
              className="registration-form__input"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="registration-form__input-error"></span>
          </div>
          <div className="registration-form-conteiner">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handleChangePassword}
              className="registration-form__input"
              required
            />
            <span className="registration-form__input-error"></span>
          </div>
          <button type="submit" className="registration-form__save-button">
            Зарегистрироваться
          </button>
        </form>
        <div className="registration-form__signin">
          <p className="registration-form__text">Уже зарегистрированы? </p>
          <Link to="/sign-in" className="registration-form__login-link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
