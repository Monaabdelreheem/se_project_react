import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// import { defaultClothingItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.some((id) => id === currentUser?._id);

    const request = !isLiked ? addCardLike(_id) : removeCardLike(_id);

    request
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const onAddItem = (data) => {
    setIsLoading(true);

    const newCardData = {
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    };
    return addItem(newCardData)
      .then((data) => {
        setClothingItems((items) => [data, ...items]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // register and login
  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);

    register({ name, avatar, email, password })
      .then(() => {
        return authorize({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onRemoveItem = () => {
    if (!cardToDelete) return;

    removeItem(cardToDelete._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id),
        );
        closeActiveModal();
        setCardToDelete(null);
        setSelectedCard({});
      })
      .catch(console.error);
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    setIsLoading(true);

    updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          setCurrentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleSignOut={handleSignOut}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleCardDelete={openConfirmationModal}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      handleCardDelete={openConfirmationModal}
                      onAddNew={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          {/* <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onSubmit={onAddItem}
          onClose={closeActiveModal}
        ></ModalWithForm> */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            onClose={closeActiveModal}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={onRemoveItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            isLoading={isLoading}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
