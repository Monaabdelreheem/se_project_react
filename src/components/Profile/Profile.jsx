import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  weatherData,
  handleCardClick,
  handleCardDelete,
  onAddNew,
  onEditProfile,
  onCardLike,
}) {
  return (
    <section className="Profile">
      <SideBar onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        handleCardDelete={handleCardDelete}
        onAddNew={onAddNew}
        onCardLike={onCardLike}
        />
    </section>
  );
}
