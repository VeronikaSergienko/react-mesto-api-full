import React from "react";
import headerLogo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ headerText, headerLink, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="Логотип" />
      <div className="header__conteiner">
        <p className="header__email">{userEmail}</p>
        <Link to={headerLink} className="header__link" onClick={onSignOut}>
          {headerText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
