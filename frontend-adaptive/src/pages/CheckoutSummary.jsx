import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function CheckoutSummary() {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { cartItems, address, payment } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { updateCart } = useCart();
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    const raw = cardNumber.replace(/-/g, "");
    const visible = raw.slice(-4);
    return "XXXX-XXXX-XXXX-" + visible;
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/checkout`,
        { cart: cartItems },
        authHeader
      );
      updateCart();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container checkout-summary">
      <h1 className="checkout-summary__title">Zusammenfassung</h1>

      <div className="summary-section">
        <h2>Produkte</h2>
        <ul className="cart__list">
          {cartItems.map((item, index) => {
            const total = (item.product_price * item.quantity).toFixed(2);
            return (
              <li key={index} className="cart__item">
                <div className="cart__item-image">
                  <img
                    src={`/images/products/${item.product_name}.png`}
                    alt={item.product_name}
                    width="50"
                    height="40"
                  />
                </div>
                <div className="cart__item-info">
                  <p className="cart__item-name">
                    Produkt: {item.product_name}
                  </p>
                  <p className="cart__item-quantity">Menge: {item.quantity}</p>
                  <p className="cart__item-price">
                    Preis pro Stück: {item.product_price} €
                  </p>
                  <p className="cart__item-total">Gesamt: {total} €</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="checkout-overview__summary">
          <p className="total">Gesamt:</p>
          <span className="total-amount">{totalPrice.toFixed(2)}€</span>
        </div>
      </div>

      <div className="summary-section">
        <h2 style={{ textAlign: "left" }}>Lieferadresse</h2>
        <p>
          {address.firstName} {address.familyName}
        </p>
        <p>
          {address.street} {address.houseNumber}
        </p>
        <p>
          {address.zip} {address.city}
        </p>
      </div>

      <div className="summary-section">
        <h2 style={{ textAlign: "left" }}>Zahlungsdaten</h2>
        <p>
          Kartennummer:{" "}
          <span className="masked-card">
            {maskCardNumber(payment.cardNumber)}
          </span>
        </p>
        <p>Ablaufdatum: {payment.expiry}</p>
      </div>

      <div className="checkout-summary__actions">
        <button className="button button--danger" onClick={() => navigate("/")}>
          Abbrechen
        </button>
        <button
          className="button button--primary"
          onClick={handleCheckout}
          disabled={isLoading}
        >
           {isLoading ? "Wird gesendet..." : "Bestellen"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
