import React from "react";
import QuantityCounter from "./QuantityCounter";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";


function ProductCard({
  product,
  quantity,
  onDecrease,
  onIncrease,
  onQuantityChange,
  onAddToCart,
  onClick,
}) {
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
          />
          <button
            className="button button--primary product-card__button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <span>In den Warenkorb</span>
          </button>
        </div>

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