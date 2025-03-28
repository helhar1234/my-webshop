import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutSummary() {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { cartItems, address, payment } = useCheckout();
  const navigate = useNavigate();
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
          onClick={async () => {
            try {
              await axios.post(
                `${API_BASE_URL}/checkout`,
                { cart: cartItems },
                authHeader
              );
              navigate("/");
            } catch (error) {
              console.error("Checkout error:", error);
            }
          }}
        >
          Bestellen
        </button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
