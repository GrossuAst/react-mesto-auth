import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import * as auth from '../auth.js';

function Register() {

    const [formValue, setFormValue] = React.useState({
        password: '',
        email: ''
    });

    const navigate = useNavigate();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
        console.log(evt.target.value)
    }

    // запрос на регистрацию
    function handleSubmit(evt) {
        evt.preventDefault();
        auth.register(formValue.password, formValue.email)
        .then(() => {
            navigate('/sign-in');
        })
        .catch((err) => {
            console.log((err))
        })
        }

    return(
        <>
            <Header><p className='header__auth-text'>Войти</p></Header>
            {/* адрес компонента в браузере '/sign-up' */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <p className="auth-form__title">Регистрация</p>
                <div className="auth-form__input-place">
                    <input className="auth-form__input" 
                        onChange={handleChange}
                        value={formValue.email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Email'
                    />
                    <input className="auth-form__input"
                        value={formValue.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
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