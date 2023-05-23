import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import * as auth from '../auth.js';

function Login({onLoggedIn, handleEmailChange}) {

    // console.log(onChangeUserEmail)

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

    function handleSubmit(evt) {
        evt.preventDefault();
        auth.authorize(formValue.password, formValue.email)
        .then((res) => {
            onLoggedIn(res);
            navigate('/');
        auth.tokenValidate(res.token)
        .then((data) => {
            handleEmailChange(data.data.email)
        })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
            <Header formValue ><p className='header__auth-text'>Регистрация</p></Header>
            {/* находится на /sign-in */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <p className="auth-form__title">Вход</p>
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
                        onChange={handleChange}
                        value={formValue.password}
                        id="password"
                        name="password"
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