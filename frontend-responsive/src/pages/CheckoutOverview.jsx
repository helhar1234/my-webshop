import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutOverview() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const { cartItems, setCartItems } = useCheckout();
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {
    return <p className="checkout-overview__empty">Keine Artikel im Checkout vorhanden.</p>;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, { withCredentials: true });
      const response = await axios.get(`${API_BASE_URL}/cart`, { withCredentials: true });
      setCartItems(response.data);
    } catch (error) {
      console.error("Fehler beim Entfernen des Produkts:", error);
    }
  };

  return (
    <div className="checkout checkout__container checkout__overview">
      <h1 className="checkout__title">Checkout – Übersicht</h1>
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
              <button
                className="button button--danger checkout__item-remove"
                onClick={() => handleRemove(item.product_id)}
              >
                Entfernen
              </button>
            </li>
          );
        })}
      </ul>
      <div className="checkout__summary">
        <p>Gesamtpreis: <span className="checkout__total-amount">{totalPrice.toFixed(2)} €</span></p>
      </div>
      <div className="checkout__actions">
        <button className="button button--danger" onClick={() => navigate("/")}>Abbrechen</button>
        <button className="button button--primary" onClick={() => navigate("/checkout/address")}>Weiter</button>
      </div>
    </div>
  );
}

export default CheckoutOverview;
