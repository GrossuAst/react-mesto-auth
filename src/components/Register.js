import React from "react";

function Register() {
    return(
        // адрес компонента в браузере '/sign-up'
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
            <p className="auth-form__link">Уже зарегестрированы? <a>Войти</a></p>
        </form>
    ) 
}

export default Register;