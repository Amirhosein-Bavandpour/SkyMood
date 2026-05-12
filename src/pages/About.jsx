function About() {
  return (
    <div className="page">
      <section className="container about-page">
        <h1>About This App</h1>

        <p>
          Iran Weather Dashboard is a React weather application focused on
          Iranian cities. It uses Open-Meteo APIs to show live weather,
          forecast, air quality, UV index, city comparison, and location-based
          weather.
        </p>

        <p>
          Built with React, Vite, Axios, localStorage, responsive CSS, and
          component-based architecture.
        </p>
      </section>
    </div>
  );
}

export default About;
