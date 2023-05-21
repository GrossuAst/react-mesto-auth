import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { api } from '../utils/api';
import Card from './Card';
import Header from './Header';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteButtonClick, onCardLike, onCardDelete}) {

    // подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <>
            <Header>
                <div className='header__nav'>
                    <p className='header__auth-text'>email@mail.com</p>
                    <p className='header__auth-text_type_exit'>Выйти</p>
                </div>
            </Header>
            <main className="main">
                <section className="profile">
                    <div className="profile__redact">
                        <button className="profile__avatar-overlay"
                            onClick={onEditAvatar}
                            style={{ 
                                backgroundImage: `url(${currentUser.avatar})`,
                                backgroundSize: 'cover'
                        }}
                        >
                        </button>
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                        <button type="button" aria-label="кнопка открытия попапа редактирования профиля" 
                            className="profile__edit-button"
                            onClick={onEditProfile}
                        >
                        </button>
                    </div>
                    <button type="button" aria-label="кнопка открытия попапа добавления карточки" 
                        className="profile__add-button"
                        onClick={onAddPlace}
                        >
                    </button>
                </section>
                <section className="elements">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} 
                        onCardClick={onCardClick} 
                        onDeleteButtonClick={onDeleteButtonClick} 
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        />
                    ))}
                </section>
            </main>
        </>
    );
  }
  
  export default Main;