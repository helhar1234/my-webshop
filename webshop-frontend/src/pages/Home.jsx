import React from "react";
import About from "../components/About";
import Carousel from "../components/Carousel";
import ShopPreview from "../components/ShopPreview";

function Home() {
    return (

        <><Carousel /><div className="home">
            <section className="home__section home__preview">
                <h2 className="home__heading">Unsere Produkte</h2>
                <ShopPreview />
            </section>

            <section className="home__section home__about">
                <h2 className="home__heading">About FreshLy</h2>
                <About />
            </section>
        </div></>
    );
}

export default Home;
