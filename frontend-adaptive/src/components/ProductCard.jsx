import React from "react";
import QuantityCounter from "./QuantityCounter";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";


function ProductCard({
  product,
  quantity,
  onDecrease,
  onIncrease,
  onQuantityChange,
  onAddToCart,
  onClick,
}) {
  const [buttonState, setButtonState] = useState("default");

  const handleClick = (e) => {
    e.stopPropagation();
    setButtonState("loading");

    setTimeout(() => {
      setButtonState("success");
      setTimeout(() => {
        setButtonState("default");
      }, 1000); // Dauer der Check-Anzeige
    }, 800); // Dauer des Ladeeffekts

    onAddToCart(); // Logik bleibt erhalten
  };

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card__image-wrapper">
        <img
          src={`/images/products/${product.name}.png`}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      <div className="product-card__content">
      <div className="product-card__top">
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__price">{product.price}€</p>
        </div>
        {/* Desktop actions (hidden on mobile) */}
        <div
          className="product-card__actions"
          onClick={(e) => e.stopPropagation()}
        >
          <QuantityCounter
            value={quantity}
            onChange={(newVal) => onQuantityChange(newVal)}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          /></div>
          <button
      className={`button button--primary product-card__button ${buttonState}`}
      onClick={handleClick}
    >
      {buttonState === "loading" && (
        <span className="loader"></span>
      )}
      {buttonState === "success" && (
        <span className="check">✔</span>
      )}
      {buttonState === "default" && (
        <span>In den Warenkorb</span>
      )}
    </button>

        <Link
          to={`/product/${product.id}`}
          className="product-card__mobile-view"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Im Shop ansehen</span>
          <ArrowRight size={18} className="product-card__icon" />
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;