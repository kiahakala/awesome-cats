import CatImage from "../assets/diana-parkhouse.jpg";

function HomePage() {
  return (
    <>
      <img src={CatImage} className="main-image" alt="Main img of a cat" />
      <div className="text-overlay">
        <h2>Awesome</h2>
        <h1>Cats</h1>
				<p>Get your daily dose of kitty images.</p>
      </div>
    </>
  );
}

export default HomePage;
