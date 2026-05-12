function About({ t }) {
  return (
    <div className="page">
      <section className="container about-page">
        <h1>{t.aboutTitle}</h1>

        <p>{t.aboutTextOne}</p>

        <p>{t.aboutTextTwo}</p>
      </section>
    </div>
  );
}

export default About;
