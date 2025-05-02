import "./Welcome.css";

export const Welcome = () => {
  return (
    <article className="welcome-container">
      <h1>
        <span>Welcome to Jakes Bakes</span>
      </h1>
      <img className="welcome-image" src={`public/assets/jakeoff.png`} alt="Pizza" />
      <section>Buy a fuggin Pizza</section>
    </article>
  );
};
