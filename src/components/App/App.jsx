import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { coordinates, apiKey, defaultClothingItems } from "../../utils/constants";
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

function App() {
  const navigate = useNavigate();
  
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
  const [authError, setAuthError] = useState("");

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

  const handleCardLike = ({ id, isLiked }) => {
    const likeAction = isLiked ? removeCardLike(id) : addCardLike(id);

    likeAction
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item)),
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
      .catch((err) => {
        console.error("Failed to add item:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // register and login
  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    setAuthError("");

    register({ name, avatar, email, password })
      .then(() => {
        return authorize({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setAuthError("Registration failed. Email may already be in use.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterClick = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setAuthError("");
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    setAuthError("");

    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        setAuthError("Incorrect email or password");
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
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
    
    getItems()
      .then((data) => {

        const itemsWithLikes = data.map(item => ({
          ...item,
          imageUrl: (item.imageUrl || item.link)?.trim(),
          likes: item.likes || []
        }));
        setClothingItems(itemsWithLikes.reverse());
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
      });
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
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
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
            onSwitchToLogin={handleLoginClick}
            error={authError}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
            onSwitchToRegister={handleRegisterClick}
            error={authError}
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
