import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./App.css";
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
import { getItems, addItem, removeItem } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal"; 

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
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);

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

  const onAddItem = (data) => {
    const newCardData = {
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    };
    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        setActiveModal("");
      })
      .catch(console.error);
  };

  const onRemoveItem = () => {
    if (!cardToDelete) return;

    removeItem(cardToDelete._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id)
        );
        setActiveModal("");
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

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
    
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
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        setCurrentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleCardDelete={openConfirmationModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  handleCardDelete={openConfirmationModal}
                  onAddNew={handleAddClick}
                />
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
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
