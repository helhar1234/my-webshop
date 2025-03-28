import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CheckoutSummary() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { cartItems, address, payment } = useCheckout();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
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
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout checkout__container checkout__summary">
      <h1 className="checkout__title">Zusammenfassung</h1>

      <div className="checkout__summary-section">
        <h2>Produkte</h2>
        <ul className="checkout__list">
          {cartItems.map((item, index) => {
            const total = (item.product_price * item.quantity).toFixed(2);
            return (
              <li key={index} className="checkout__item">
                <div className="checkout__item-image">
                  <img
                    src={`/images/products/${item.product_name}.png`}
                    alt={item.product_name}
                    width="50"
                    height="40"
                  />
                </div>
                <div className="checkout__item-info">
                  <p>Produkt: {item.product_name}</p>
                  <p>Menge: {item.quantity}</p>
                  <p>Preis pro Stück: {item.product_price} €</p>
                  <p>Gesamt: {total} €</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="checkout__summary-total">
          Gesamt: <span className="checkout__total-amount">{totalPrice.toFixed(2)} €</span>
        </p>
      </div>

      <div className="checkout__summary-section">
        <h2>Lieferadresse</h2>
        <p>{address.firstName} {address.familyName}</p>
        <p>{address.street} {address.houseNumber}</p>
        <p>{address.zip} {address.city}</p>
      </div>

      <div className="checkout__summary-section">
        <h2>Zahlungsdaten</h2>
        <p>Kartennummer: <span className="checkout__masked-card">{maskCardNumber(payment.cardNumber)}</span></p>
        <p>Ablaufdatum: {payment.expiry}</p>
      </div>

      <div className="checkout__actions">
        <button className="button button--danger" onClick={() => navigate("/")}>Abbrechen</button>
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
