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
  onSignOut,
  onCardLike,
}) {
  return (
    <section className="Profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
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
// export default function Profile() {
//   return (
//     <section style={{ background: "yellow", height: "500px" }}>
//       PROFILE PAGE IS RENDERING
//     </section>
//   );
// }
