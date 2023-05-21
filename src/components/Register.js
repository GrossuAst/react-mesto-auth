import React from "react";
import Header from "./Header";

function Register() {
    return(
        <>
            <Header><p className='header__auth-text'>Войти</p></Header>
            {/* адрес компонента в браузере '/sign-up' */}
            <form className="auth-form">
                <p className="auth-form__title">Регистрация</p>
                <div className="auth-form__input-place">
                    <input className="auth-form__input" 
                        type="email"
                        placeholder='Email'
                    />
                    <input className="auth-form__input" 
                        type="password"
                        placeholder='Пароль'
                    />
                </div>
                
                <button className="auth-form__submit-button" type="submit">Зарегистрироваться</button>
                <p className="auth-form__link">Уже зарегестрированы? Войти</p>
            </form>
        </>
    ) 
}

export default Register;