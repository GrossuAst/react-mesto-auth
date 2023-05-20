import React from 'react';
import headerLogo from '../images/icons/header-logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип страницы" className="header__logo" />
        </header>
    );
  }
  
  export default Header;