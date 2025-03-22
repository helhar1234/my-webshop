import React from "react";
import QuantityCounter from "./QuantityCounter";

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
      <h2 className="product-card__name">{product.name}</h2>
      <p className="product-card__price">{product.price}€</p>

      {/* Quantity Counter – bleibt oben */}
      <div className="product-card__actions" onClick={(e) => e.stopPropagation()}>
        <QuantityCounter
          value={quantity}
          onChange={(newVal) => onQuantityChange(newVal)}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      </div>

      {/* Full-Width Add-to-Cart Button unterhalb */}
      <button
        className="button button--primary product-card__button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
      >
        In den Warenkorb
      </button>
    </div>
  );
}

export default ProductCard;
