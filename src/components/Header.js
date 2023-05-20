import React from 'react';
import headerLogo from '../images/icons/header-logo.svg';

function Header(props) {
    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип страницы" className="header__logo" />
            <a className='header__auth-text'>{props.isLoggedIn ? 'Войти' : 'Регистрация'}</a>
        </header>
    );
  }
  
  export default Header;