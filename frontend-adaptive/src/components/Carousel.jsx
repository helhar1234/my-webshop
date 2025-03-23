import React, { useState, useEffect, useRef } from "react";

const slides = [
  { src: "/images/img/field-farmer.jpg", text: "Schnelle Lieferung" },
  { src: "/images/img/cook.jpg", text: "Gesund" },
  { src: "/images/img/deliver.jpg", text: "Frisch" },
  { src: "/images/img/fresh-produce.jpg", text: "Vielfältiges Sortiment" },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000; // 5 Sekunden

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [current]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handlePrev = () => {
    resetTimeout();
    setCurrent((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    resetTimeout();
    setCurrent((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel__slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.src})` }}
        >
          <div className="carousel__overlay">
            <h2>{slide.text}</h2>
          </div>
        </div>
      ))}

      <button className="carousel__arrow carousel__arrow--left" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel__arrow carousel__arrow--right" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;