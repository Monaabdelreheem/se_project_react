import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";



export default function Profile({clothingItems, weatherData, handleCardClick}) {
return <section className="Profile">
    <SideBar />
    <ClothesSection clothingItems={clothingItems} weatherData={weatherData} handleCardClick={handleCardClick} />
</section>
}