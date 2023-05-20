import React from "react";

// компоненты
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PupupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

// апи
import { api } from "../utils/api";

// импорт контекста
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupVisible] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupVisible] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupVisible] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupVisible] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCardsArray] = React.useState([]);

  // рендер данных при открытии страницы
  React.useEffect(() => {
    Promise.all([api.getInfoAboutUser(), api.getInitialCards()])
    .then(([userInfo, cards]) => {
      setCurrentUser(userInfo);
      setCardsArray(cards);
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }, []);

  //обновление данных профиля 
  function handleUpdateUser(currentUser) {
    api.editProfileInfo(currentUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // обновление аватара
  function handleUpdateAvatar(avatarUrl) {
    api.editAvatar(avatarUrl)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // добавление карточки
  function handleAddPlaceSubmit(card) {
    api.sendCard(card)
    .then((res) => {
      setCardsArray([res, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // попап удаления карточки
  // function handleDeleteCardClick() {
  //   setDeleteCardPopupVisible(true);
  // }

  // функция удаления карточки
  function handleCardDelete(card) {
    console.log(cards)
    api.deleteCard(card._id)
    .then(() => {
      const cardToDelete = card;
      setCardsArray(cards.filter((card) => card !== cardToDelete))
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // открытие карточки в фуллскрин
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // попап формы профиля
  function handleEditProfileClick() {
    setEditProfilePopupVisible(true);
  }

  // попап формы добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupVisible(true);
  }
  
  // попап формы аватарки
  function handleEditAvatarClick() {
    setAvatarPopupVisible(true);
  }

  // функция переключения лайка
  function handleCardLike(card) {
    // console.log(card)
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCardsArray((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupVisible(false);
    setAddPlacePopupVisible(false);
    setAvatarPopupVisible(false);
    setSelectedCard();
    setDeleteCardPopupVisible(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='wrapper'>
        <div className="content">

          <Header />

          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            // onDeleteButtonClick={handleDeleteCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          {/* попап аватарки */}
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* попап формы профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            // user={currentUser}
          />

          {/* попап формы добавления карточки */}
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* <PopupWithForm 
            name='add-card'
            isOpen={isAddPlacePopupOpen}
            title='Новое место'
            buttonText='Сохранить'
            onClose={closeAllPopups}
          >
            <input 
              name="title"
              placeholder="Название"
              className="popup__input"
            />
            <span 
              className="popup__error"
            />
            <input 
              name="link"
              placeholder="Ссылка на картинку"
              className="popup__input"
            />
            <span 
              className="popup__error"
            />
          </PopupWithForm> */}

          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <PopupWithForm
            name='delete-card'
            isOpen={isDeleteCardPopupOpen}
            title='Вы уверены?'
            onClose={closeAllPopups}
            buttonText='Да'
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
