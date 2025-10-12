import WeatherCard from "./WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__texts">
            Today is 75 &deg; F / You may want to wear:
        </p>
        {/* TODO add the cards */}
      </section>
    </main>
  );
}

export default Main;
