import React from "react";

function About() {
  return (
    <div className="about container">
      {/* Hero Section */}
      <section className="about__hero">
        <img
          src="/images/img/fresh-produce.jpg"
          alt="Frische Produkte"
          className="about__hero-image"
        />
        <div className="about__hero-text">
          <h1>Frisch. Nachhaltig. Authentisch.</h1>
          <p>
            FreshLy liefert Ihnen die frischesten Obst- und Gemüsesorten direkt vom Feld – für ein gesundes, nachhaltiges Leben. Wir verbinden traditionelle Landwirtschaft mit modernem Service, um Ihnen die beste Qualität zu bieten.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about__mission">
        <h2>Unsere Mission</h2>
        <p>
          Wir glauben an die Kraft frischer, regionaler Produkte und setzen auf nachhaltige Landwirtschaft. Unser Ziel ist es, Menschen mit gesunden Lebensmitteln zu versorgen und dabei aktiv einen Beitrag zum Umweltschutz zu leisten. Durch enge Zusammenarbeit mit lokalen Bauern und modernste Logistik sorgen wir dafür, dass jedes Produkt seinen optimalen Reifegrad erreicht.
        </p>
        <img
          src="/images/img/sustainable.jpg"
          alt="Regionaler Bauer"
          className="about__mission-image"
        />
      </section>

      {/* Über uns Section */}
      <section className="about__overview">
        <h2>Über FreshLy</h2>
        <p>
          FreshLy wurde gegründet, um den Zugang zu hochwertigen, frischen Lebensmitteln zu vereinfachen. Unser Team arbeitet Tag für Tag daran, Ihnen ein innovatives Einkaufserlebnis zu bieten. Wir sind stolz darauf, Ihnen eine große Auswahl an saisonalen und regionalen Produkten anzubieten – von knackigem Gemüse bis zu saftigen Früchten.
        </p>
        <p>
          Mit modernster Technologie und einem starken Fokus auf Nachhaltigkeit optimieren wir unsere Prozesse ständig. Bei FreshLy steht Qualität an erster Stelle - von der Auswahl der Produkte bis hin zur Auslieferung direkt zu Ihnen nach Hause.
        </p>
      </section>

      {/* Team Section */}
      <section className="about__team">
        <h2>Unser Team</h2>
        <div className="row about__team-members">
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="team-member">
              <img
                src="/images/img/ceo.jpg"
                alt="Unsere CEO und Gründerin"
                className="team-member__image"
              />
              <h3>Maxime Musterfrau</h3>
              <p>Gründerin & CEO</p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="team-member">
              <img
                src="/images/img/farmer.jpg"
                alt="Unsere PartnerInnen"
                className="team-member__image"
              />
              <h3>Erika Muserbauer</h3>
              <p>Partnerschaft & Logistik</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;