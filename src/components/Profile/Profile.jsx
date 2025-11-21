import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  weatherData,
  handleCardClick,
  handleCardDelete,
  onAddNew,
}) {
  return (
    <section className="Profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        handleCardDelete={handleCardDelete}
        onAddNew={onAddNew}
      />
    </section>
  );
}
