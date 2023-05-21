import React from "react";
import Header from "./Header";

function Login() {
    return(
        <>
            <Header><p className='header__auth-text'>Регистрация</p></Header>
            {/* находится на /sign-in */}
            <form className="auth-form">
                <p className="auth-form__title">Вход</p>
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
                
                <button className="auth-form__submit-button" type="submit">Войти</button>
            </form>
        </>
    ) 
}

export default Login;