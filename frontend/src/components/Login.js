import React, { useState } from "react";
import Header from "./Header.js";

function Login({ onLogin }) {
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
    // Передаём значения управляемых компонентов во внешний обработчик
    onLogin({
      email,
      password,
    });
  }
  return (
    <div>
      <Header headerText={"Регистрация"} headerLink={"/sign-up"} />
      <div className="registration-form">
        <form className="popup__form" onSubmit={handleSubmit}>
          <h2 className="registration-form__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
