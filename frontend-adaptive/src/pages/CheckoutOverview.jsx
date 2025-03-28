import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutOverview() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { cartItems, setCartItems } = useCheckout();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

  if (!cartItems || cartItems.length === 0) {
    return <p className="checkout-overview__empty">Keine Artikel im Checkout vorhanden.</p>;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, authHeader);
      const response = await axios.get(`${API_BASE_URL}/cart`, authHeader);
      setCartItems(response.data);
    } catch (error) {
      console.error("Fehler beim Entfernen des Produkts:", error);
    }
  };

  return (
    <div className="checkout-container checkout-overview">
      <h1>Checkout – Übersicht</h1>
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
                  <p className="cart__item-name">{item.product_name}</p>
                  <p className="cart__item-quantity">Menge: {item.quantity}</p>
                  <p className="cart__item-total">Gesamt: {total} €</p>
                </div>
              <button
                className="cart__item-remove"
                onClick={() => handleRemove(item.product_id)}
              >
                Entfernen
              </button>
            </li>
          );
        })}
      </ul>
      <div className="checkout-overview__summary">
      <p>Gesamtpreis: </p>
  <span className="total-amount">{totalPrice.toFixed(2)} €</span>
</div>

      <div className="checkout-overview__actions">
        <button className="button button--danger" onClick={() => navigate("/")}>
          Abbrechen
        </button>
        <button className="button button--primary" onClick={() => navigate("/checkout/address")}>
          Weiter
        </button>
      </div>
    </div>
  );
}

export default CheckoutOverview;
